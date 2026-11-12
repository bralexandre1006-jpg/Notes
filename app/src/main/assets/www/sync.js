'use strict';
(function () {
  const CFG = window.FIREBASE_CONFIG || {};
  const AUTH = CFG.authHost || 'https://identitytoolkit.googleapis.com';
  const TOKEN = CFG.tokenHost || 'https://securetoken.googleapis.com';
  const DBURL = (CFG.databaseURL || '').replace(/\/+$/, '');
  const AK = 'notes.sync.v1', SK = 'notes.sync.shadow.v1';
  const rd = k => { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } };
  const wr = (k, v) => { try { v == null ? localStorage.removeItem(k) : localStorage.setItem(k, JSON.stringify(v)); } catch (e) { } };

  let auth = rd(AK);
  let st = rd(SK) || {};
  let shadow = st.shadow || {}, tomb = st.tomb || {};
  let host = null, seen = {}, deferred = {};
  let es = null, ready = false, status = 'off', pushT = null, retryT = null, pushing = false, again = false, backoff = 2000;
  const listeners = [];

  const saveSt = () => wr(SK, { shadow, tomb });
  const setStatus = s => { if (s !== status) { status = s; listeners.forEach(f => f(s)); } };

  function hash(o) {
    const s = JSON.stringify(o, (k, v) => (k === 'u' || v === null || (typeof v === 'object' && !Object.keys(v).length) ? undefined : v));
    let h = 5381;
    for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0;
    return (h >>> 0).toString(36) + s.length.toString(36);
  }
  function entries() {
    const d = host.get(), m = {};
    d.notes.forEach(n => { m['n/' + n.id] = n; });
    d.folders.forEach(f => { m['f/' + f.id] = f; });
    m['s/settings'] = d.settings;
    return m;
  }

  function attach(h) {
    host = h;
    const m = entries();
    for (const k in m) {
      const it = m[k];
      if (typeof it.u !== 'number') it.u = it.modified || it.created || 0;
      seen[k] = hash(it);
    }
    if (auth) connect();
  }

  function track() {
    if (!host) return;
    const m = entries(), now = Date.now();
    let dirty = false;
    for (const k in m) {
      const it = m[k], h = hash(it);
      if (seen[k] !== h) {
        const s = shadow[k];
        it.u = Math.max(now, ((s && s.u) || 0) + 1, (it.u || 0) + 1);
        seen[k] = h; delete tomb[k]; dirty = true;
      }
      if (deferred[k] && host.canApply(k)) { const v = deferred[k]; delete deferred[k]; if ((it.u || 0) < v.u && applyOne(k, v, m)) setTimeout(() => host.changed([k]), 0); }
    }
    for (const k in seen) if (!(k in m)) { delete seen[k]; tomb[k] = now; dirty = true; }
    if (dirty) { saveSt(); schedulePush(); }
  }

  function schedulePush(ms) { clearTimeout(pushT); pushT = setTimeout(push, ms == null ? 600 : ms); }

  async function push() {
    if (!auth || !ready || !host) return;
    if (pushing) { again = true; return; }
    const m = entries(), upd = {}, sent = {};
    for (const k in m) {
      const it = m[k], h = hash(it), s = shadow[k];
      if (!s || (s.d ? it.u > s.u : s.h !== h && it.u > s.u)) {
        const j = JSON.stringify(it);
        if (j.length < 9e6) { upd[k] = { u: it.u, j }; sent[k] = { h, u: it.u }; }
      }
    }
    for (const k in tomb) { upd[k] = { d: 1, u: tomb[k] }; sent[k] = { d: 1, u: tomb[k] }; }
    if (!Object.keys(upd).length) return;
    pushing = true;
    try {
      const t = await token();
      const r = await fetch(`${DBURL}/users/${auth.uid}.json?auth=${encodeURIComponent(t)}`, { method: 'PATCH', body: JSON.stringify(upd) });
      if (!r.ok) throw new Error('HTTP ' + r.status);
      for (const k in sent) { shadow[k] = sent[k]; if (sent[k].d && tomb[k] === sent[k].u) delete tomb[k]; }
      saveSt();
      if (status !== 'ok' && es && es.readyState === 1) setStatus('ok');
    } catch (e) {
      setStatus(navigator.onLine === false ? 'offline' : 'error');
      clearTimeout(retryT); retryT = setTimeout(push, 15000);
    } finally {
      pushing = false;
      if (again) { again = false; schedulePush(50); }
    }
  }

  function applyOne(k, v, m) {
    const L = m[k], s = shadow[k];
    if (v.d) {
      shadow[k] = { d: 1, u: v.u };
      if (L && (L.u || 0) <= v.u) {
        if (!host.canApply(k)) { deferred[k] = v; return false; }
        host.remove(k); delete seen[k]; delete tomb[k]; delete m[k]; return true;
      }
      return false;
    }
    const h = hash(v);
    if (L && seen[k] === h) { shadow[k] = { h, u: Math.max(v.u, L.u || 0) }; L.u = shadow[k].u; return false; }
    if (tomb[k] && tomb[k] >= v.u) return false;
    shadow[k] = { h, u: v.u };
    if (!L || (L.u || 0) < v.u || ((L.u || 0) === v.u && !s)) {
      if (L && !host.canApply(k)) { deferred[k] = v; return false; }
      host.put(k, v); seen[k] = h; delete tomb[k]; delete deferred[k]; return true;
    }
    return false;
  }

  function incoming(path, data, merge) {
    const parts = path.split('/').filter(Boolean);
    const changes = [];
    const walk = (segs, val) => {
      if (segs.length === 0) { if (val && typeof val === 'object') for (const c in val) walk([c], val[c]); }
      else if (segs.length === 1) {
        if (val && typeof val === 'object') for (const id in val) walk([segs[0], id], val[id]);
      } else if (segs.length === 2 && val && typeof val === 'object' && typeof val.u === 'number') {
        if (val.d) changes.push([segs[0] + '/' + segs[1], { d: 1, u: val.u }]);
        else if (typeof val.j === 'string') { try { const o = JSON.parse(val.j); if (o && typeof o === 'object') { o.u = val.u; changes.push([segs[0] + '/' + segs[1], o]); } } catch (e) { } }
      }
    };
    if (merge && data && typeof data === 'object') {
      for (const rel in data) walk(parts.concat(rel.split('/').filter(Boolean)), data[rel]);
    } else walk(parts, data);
    const m = entries();
    let any = false;
    const keys = [];
    changes.forEach(([k, v]) => { if (k[0] === 'n' || k[0] === 'f' || k === 's/settings') { if (applyOne(k, v, m)) { any = true; keys.push(k); } } });
    saveSt();
    if (any) host.changed(keys);
  }

  async function token() {
    if (!auth) throw new Error('auth');
    if (auth.exp - 120000 > Date.now()) return auth.idToken;
    const r = await fetch(`${TOKEN}/v1/token?key=${CFG.apiKey}`, {
      method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: 'grant_type=refresh_token&refresh_token=' + encodeURIComponent(auth.refresh)
    });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) {
      const msg = (j.error && j.error.message) || '';
      if (/TOKEN_EXPIRED|USER_DISABLED|USER_NOT_FOUND|INVALID_REFRESH_TOKEN/.test(msg)) { logout(); setStatus('error'); }
      throw new Error(msg || 'token');
    }
    auth.idToken = j.id_token; auth.refresh = j.refresh_token; auth.exp = Date.now() + (+j.expires_in || 3600) * 1000;
    wr(AK, auth);
    return auth.idToken;
  }

  let connT = null;
  function closeStream() { clearTimeout(connT); if (es) { es.close(); es = null; } }
  async function connect() {
    closeStream();
    if (!auth || !configured()) return;
    setStatus('connecting');
    let t;
    try { t = await token(); } catch (e) { if (auth) retry(); return; }
    const src = new EventSource(`${DBURL}/users/${auth.uid}.json?auth=${encodeURIComponent(t)}`);
    es = src;
    const on = (ev, f) => src.addEventListener(ev, e => { if (es === src) f(e); });
    on('put', e => { const d = JSON.parse(e.data); incoming(d.path, d.data, false); if (!ready || d.path === '/') { ready = true; backoff = 2000; setStatus('ok'); schedulePush(0); } });
    on('patch', e => { const d = JSON.parse(e.data); incoming(d.path, d.data, true); });
    on('auth_revoked', () => { auth.exp = 0; connect(); });
    on('cancel', () => { auth.exp = 0; retry(); });
    src.onerror = () => { if (es !== src) return; setStatus(navigator.onLine === false ? 'offline' : 'connecting'); retry(); };
  }
  function retry() {
    closeStream();
    connT = setTimeout(connect, backoff);
    backoff = Math.min(backoff * 2, 60000);
  }

  async function authCall(kind, email, password) {
    const r = await fetch(`${AUTH}/v1/accounts:${kind}?key=${CFG.apiKey}`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, returnSecureToken: true })
    });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(errText((j.error && j.error.message) || ''));
    auth = { email: j.email || email, uid: j.localId, idToken: j.idToken, refresh: j.refreshToken, exp: Date.now() + (+j.expiresIn || 3600) * 1000 };
    wr(AK, auth);
    shadow = {}; tomb = {}; deferred = {}; ready = false; saveSt();
    backoff = 2000;
    connect();
    return auth.email;
  }
  function errText(m) {
    if (/EMAIL_EXISTS/.test(m)) return 'Un compte existe déjà avec cette adresse.';
    if (/INVALID_LOGIN_CREDENTIALS|INVALID_PASSWORD|EMAIL_NOT_FOUND/.test(m)) return 'Adresse ou mot de passe incorrect.';
    if (/WEAK_PASSWORD/.test(m)) return 'Mot de passe trop court (6 caractères minimum).';
    if (/INVALID_EMAIL/.test(m)) return 'Adresse e-mail invalide.';
    if (/TOO_MANY_ATTEMPTS/.test(m)) return 'Trop de tentatives, réessayez plus tard.';
    if (/OPERATION_NOT_ALLOWED|CONFIGURATION_NOT_FOUND/.test(m)) return 'Connexion par e-mail non activée dans Firebase.';
    return 'Connexion impossible. Vérifiez Internet.';
  }
  function logout() {
    closeStream(); clearTimeout(pushT); clearTimeout(retryT);
    auth = null; ready = false; shadow = {}; tomb = {}; deferred = {};
    wr(AK, null); wr(SK, null); setStatus('off');
  }
  function configured() { return !!(CFG.apiKey && DBURL); }

  window.addEventListener('online', () => { if (auth && (!es || es.readyState === 2)) { backoff = 2000; connect(); } else schedulePush(0); });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden || !auth) return;
    if (!es || es.readyState === 2) { backoff = 2000; connect(); } else schedulePush(0);
  });

  window.Sync = {
    attach, track, logout, configured,
    signIn: (e, p) => authCall('signInWithPassword', e, p),
    signUp: (e, p) => authCall('signUp', e, p),
    now: () => { if (!auth) return; backoff = 2000; connect(); },
    email: () => auth && auth.email,
    status: () => status,
    onStatus: f => listeners.push(f)
  };
})();
