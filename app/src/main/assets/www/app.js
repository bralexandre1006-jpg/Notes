'use strict';
/* ================= icons ================= */
const sv = (p, s = 24, w = 2) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
const I = {
  back: sv('<path d="M15 4l-8 8 8 8"/>', 26, 2.6),
  more: '<svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>',
  folder: sv('<path d="M3 7.5A2.5 2.5 0 0 1 5.5 5h3.4l2 2h7.6A2.5 2.5 0 0 1 21 9.5v8a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5z"/><path d="M3 10.5h18"/>', 30, 1.6),
  folderS: sv('<path d="M3 7.5A2.5 2.5 0 0 1 5.5 5h3.4l2 2h7.6A2.5 2.5 0 0 1 21 9.5v8a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5z"/><path d="M3 10.5h18"/>', 20, 1.6),
  folderPlus: sv('<path d="M14 19H5.5A2.5 2.5 0 0 1 3 16.5v-9A2.5 2.5 0 0 1 5.5 5h3.4l2 2h7.6A2.5 2.5 0 0 1 21 9.5V12"/><path d="M3 10.5h11"/><circle cx="18.5" cy="7" r="4.2" fill="currentColor" stroke="none"/><path d="M18.5 5v4M16.5 7h4" stroke="#232325" stroke-width="1.6"/>', 30, 1.7),
  compose: sv('<path d="M11 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6"/><path d="M18.4 2.6a2 2 0 0 1 2.9 2.9L12 14.8l-3.8.9.9-3.8z"/>', 26, 2.1),
  search: sv('<circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5L21 21"/>', 24, 2.4),
  xc: '<svg width="20" height="20" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#636366"/><path d="M8.5 8.5l7 7M15.5 8.5l-7 7" stroke="#1c1c1e" stroke-width="2.2" stroke-linecap="round"/></svg>',
  trash: sv('<path d="M4 6h16M9 6V4h6v2M6 6l1 14a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-14"/><path d="M10 10v7M14 10v7"/>', 30, 1.6),
  gear: sv('<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="1.6"/><path d="M12 12V5M12 12l6 3.5M12 12l-6 3.5"/><path d="M12 1.8v1.7M12 20.5v1.7M1.8 12h1.7M20.5 12h1.7M4.8 4.8L6 6M18 18l1.2 1.2M4.8 19.2L6 18M18 6l1.2-1.2"/>', 30, 1.5),
  share: sv('<path d="M12 3v12M7.5 7.5L12 3l4.5 4.5"/><path d="M8 10H6.5A1.5 1.5 0 0 0 5 11.5v8A1.5 1.5 0 0 0 6.5 21h11a1.5 1.5 0 0 0 1.5-1.5v-8a1.5 1.5 0 0 0-1.5-1.5H16"/>', 26, 2),
  checklist: sv('<circle cx="5.5" cy="7" r="3.2" fill="currentColor" stroke="none"/><path d="M4 7l1.1 1.1L7.2 5.8" stroke="#1c1c1e" stroke-width="1.5"/><circle cx="5.5" cy="17" r="3"/><path d="M12 7h9M12 17h9"/>', 30, 1.8),
  clip: sv('<path d="M20.5 11.5l-8.3 8.3a5.2 5.2 0 0 1-7.4-7.4l8.6-8.6a3.5 3.5 0 0 1 4.9 4.9l-8.6 8.6a1.7 1.7 0 0 1-2.5-2.5l7.9-7.9"/>', 30, 1.8),
  check: sv('<path d="M5 12.5l4.5 4.5L19 7"/>', 28, 2.6),
  checkS: sv('<path d="M5 12.5l4.5 4.5L19 7"/>', 16, 3.2),
  checkCircle: sv('<circle cx="12" cy="12" r="9.5"/><path d="M7.8 12.3l3 3 5.5-6"/>', 30, 1.7),
  sort: sv('<path d="M7 20V4M3 8l4-4 4 4M17 4v16M13 16l4 4 4-4"/>', 30, 1.7),
  chevR: sv('<path d="M9 5l7 7-7 7"/>', 22, 2.4),
  chevD: sv('<path d="M5 9l7 7 7-7"/>', 26, 2.4),
  table: sv('<rect x="3" y="4.5" width="18" height="15" rx="2.5"/><path d="M3 9.5h18M3 14.5h18M12 9.5v10"/>', 30, 1.8),
  list: sv('<circle cx="4.5" cy="6" r="1.3" fill="currentColor"/><circle cx="4.5" cy="12" r="1.3" fill="currentColor"/><circle cx="4.5" cy="18" r="1.3" fill="currentColor"/><path d="M9 6h12M9 12h12M9 18h12"/>', 30, 1.8),
  move: sv('<path d="M3 7.5A2.5 2.5 0 0 1 5.5 5h3.4l2 2h7.6A2.5 2.5 0 0 1 21 9.5v8a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5z"/><path d="M9 14h6M12.5 11.5L15 14l-2.5 2.5"/>', 28, 1.6),
  minus: '<svg width="14" height="14" viewBox="0 0 24 24"><path d="M5 12h14" stroke="#fff" stroke-width="3.5" stroke-linecap="round"/></svg>',
  restore: sv('<path d="M4 12a8 8 0 1 0 2.4-5.7M4 4v4.5h4.5"/>', 28, 1.7),
  pencil: sv('<path d="M15.5 4.5l4 4L8 20H4v-4z"/>', 28, 1.6)
};

/* ================= data ================= */
const KEY = 'notes.data.v1';
const DAY = 864e5;
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function fresh() {
  return { folders: [{ id: 'notes', name: 'Notes', created: Date.now() }], notes: [], settings: { sort: 'modified', group: true }, ui: { collapsed: false } };
}
function load() {
  try {
    const d = JSON.parse(localStorage.getItem(KEY));
    if (d && Array.isArray(d.notes)) {
      d.settings = Object.assign({ sort: 'modified', group: true }, d.settings);
      d.ui = d.ui || { collapsed: false };
      if (!d.folders.find(f => f.id === 'notes')) d.folders.unshift({ id: 'notes', name: 'Notes', created: Date.now() });
      return d;
    }
  } catch (e) { }
  return fresh();
}
let db = load();
function persist() {
  try { localStorage.setItem(KEY, JSON.stringify(db)); }
  catch (e) { dialog({ title: 'Stockage plein', msg: 'Supprimez des images ou des notes pour libérer de la place.', ok: 'OK', noCancel: true }); }
}
(function purge() {
  const lim = Date.now() - 30 * DAY;
  const n = db.notes.length;
  db.notes = db.notes.filter(x => !x.deleted || x.deleted > lim);
  if (n !== db.notes.length) persist();
})();

const folderOf = id => db.folders.find(f => f.id === id) || db.folders[0];
const live = () => db.notes.filter(n => !n.deleted);
const trash = () => db.notes.filter(n => n.deleted);
const inFolder = fid => live().filter(n => n.folderId === fid);

function lines(n) { return (n.text || '').split('\n').map(s => s.trim()).filter(Boolean); }
function titleOf(n) { return lines(n)[0] || 'Nouvelle note'; }
function previewOf(n) { return lines(n)[1] || 'Pas de texte supplémentaire'; }
function imgOf(n) { const m = /<img[^>]+src="([^"]+)"/.exec(n.html || ''); return m ? m[1] : null; }

/* ================= dates ================= */
const MONTHS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
const p2 = n => String(n).padStart(2, '0');
const sod = t => { const d = new Date(t); d.setHours(0, 0, 0, 0); return d.getTime(); };
function shortDate(t) {
  const d = new Date(t), today = sod(Date.now());
  if (t >= today) return p2(d.getHours()) + ':' + p2(d.getMinutes());
  if (t >= today - DAY) return 'Hier';
  return p2(d.getDate()) + '/' + p2(d.getMonth() + 1) + '/' + d.getFullYear();
}
function groupLabel(t) {
  const d = new Date(t), now = new Date(), today = sod(Date.now());
  if (t >= today) return "Aujourd'hui";
  if (t >= today - DAY) return 'Hier';
  if (d.getFullYear() === now.getFullYear()) return MONTHS[d.getMonth()];
  return String(d.getFullYear());
}
function longDate(t) {
  const d = new Date(t);
  return d.getDate() + ' ' + MONTHS[d.getMonth()] + ' ' + d.getFullYear() + ' à ' + p2(d.getHours()) + ':' + p2(d.getMinutes());
}

/* ================= state / nav ================= */
const app = document.getElementById('app');
const ov = document.getElementById('overlay');
const fileInput = document.getElementById('file');
let stack = [{ v: 'folders' }];
let query = '';
let folderEdit = false;
let selMode = false;
let selected = new Set();
let ed = null, edNote = null, saveT = null, savedRange = null, newCk = false;

const cur = () => stack[stack.length - 1];
function go(r) { leaveEditor(); stack.push(r); query = ''; selMode = false; selected.clear(); render(true); }
function pop() { leaveEditor(); if (stack.length > 1) stack.pop(); query = ''; selMode = false; selected.clear(); render(true); }

window.onBack = function () {
  if (ov.classList.contains('show')) { closeOverlay(); return true; }
  if (selMode) { selMode = false; selected.clear(); render(); return true; }
  if (folderEdit) { folderEdit = false; render(); return true; }
  if (query) { query = ''; render(); return true; }
  if (stack.length > 1) { pop(); return true; }
  return false;
};
window.flushSave = () => { if (edNote) saveNote(); };
document.addEventListener('visibilitychange', () => { if (document.hidden) window.flushSave(); });

/* ================= render ================= */
function render(anim) {
  const r = cur();
  const oldScroll = app.querySelector('.scroll');
  const keep = !anim && oldScroll ? oldScroll.scrollTop : 0;
  if (r.v === 'folders') app.innerHTML = vFolders();
  else if (r.v === 'list') app.innerHTML = vList(r.id);
  else if (r.v === 'editor') app.innerHTML = vEditor(r.id);
  else if (r.v === 'settings') app.innerHTML = vSettings();
  const sc = app.querySelector('.scroll');
  if (sc && keep) sc.scrollTop = keep;
  if (anim) { app.classList.remove('fade'); void app.offsetWidth; app.classList.add('fade'); }
  bindSearch();
  if (r.v === 'editor') setupEditor(r.focus);
}

function bottomSearch(compose = true) {
  return `<div class="bottom">
    <div class="search">${I.search}<input id="q" placeholder="Recherche" value="${esc(query)}" autocomplete="off">${query ? `<button class="x" data-a="clearQ">${I.xc}</button>` : ''}</div>
    ${compose ? `<button class="compose" data-a="newNote">${I.compose}</button>` : ''}
  </div>`;
}
function bindSearch() {
  const q = document.getElementById('q');
  if (!q) return;
  q.addEventListener('input', () => {
    query = q.value;
    const c = document.getElementById('content');
    if (c) c.innerHTML = cur().v === 'folders' ? foldersContent() : listContent(cur().id);
    const s = q.parentElement, x = s.querySelector('.x');
    if (query && !x) s.insertAdjacentHTML('beforeend', `<button class="x" data-a="clearQ">${I.xc}</button>`);
    if (!query && x) x.remove();
  });
}
const match = n => !query || (n.text || '').toLowerCase().includes(query.toLowerCase());

function noteCard(n) {
  const sort = db.settings.sort, t = sort === 'created' ? n.created : n.modified;
  const img = imgOf(n);
  const sel = selMode ? `<div class="sel ${selected.has(n.id) ? 'on' : ''}">${selected.has(n.id) ? I.checkS : ''}</div>` : '';
  return `<div class="ncard" data-a="open" data-id="${n.id}">${sel}
    <div class="b"><div class="nt">${esc(titleOf(n))}</div>
    <div class="n2"><span class="d">${shortDate(n.deleted || t)}</span>${esc(previewOf(n))}</div>
    <div class="n3">${I.folderS}${esc(folderOf(n.folderId).name)}</div></div>
    ${img ? `<img class="thumb" src="${img}">` : ''}</div>`;
}
function sortNotes(arr) {
  const s = db.settings.sort;
  if (s === 'title') return arr.sort((a, b) => titleOf(a).localeCompare(titleOf(b), 'fr', { sensitivity: 'base' }));
  if (s === 'created') return arr.sort((a, b) => b.created - a.created);
  return arr.sort((a, b) => b.modified - a.modified);
}
function notesBlock(arr, trashMode) {
  if (!arr.length) return `<div class="empty">${query ? 'Aucun résultat' : 'Aucune note'}</div>`;
  if (trashMode) return arr.sort((a, b) => b.deleted - a.deleted).map(noteCard).join('');
  sortNotes(arr);
  if (db.settings.sort === 'title' || !db.settings.group) return `<div style="height:20px"></div>` + arr.map(noteCard).join('');
  const key = db.settings.sort === 'created' ? 'created' : 'modified';
  let out = '', last = null;
  for (const n of arr) {
    const g = groupLabel(n[key]);
    if (g !== last) { out += `<h2>${esc(g)}</h2>`; last = g; }
    out += noteCard(n);
  }
  return out;
}

/* ---------- folders view ---------- */
function vFolders() {
  return `<div class="hdr"><span></span><div class="r">
      ${folderEdit ? '' : `<button class="cb" data-a="newFolder">${I.folderPlus}</button>`}
      <button class="pill" data-a="toggleFolderEdit">${folderEdit ? 'OK' : 'Modifier'}</button></div></div>
    <div class="scroll" id="content">${foldersContent()}</div>
    ${folderEdit ? '' : bottomSearch()}`;
}
function foldersContent() {
  if (query) {
    const r = live().filter(match);
    return `<h1>Recherche</h1><div class="count">${r.length} résultat${r.length > 1 ? 's' : ''}</div>` + notesBlock(r);
  }
  const col = db.ui.collapsed;
  const rows = db.folders.map(f => {
    const del = folderEdit && f.id !== 'notes';
    return `<div class="row" data-a="${del ? 'renameFolder' : 'openFolder'}" data-id="${f.id}">
      ${del ? `<button class="minus" data-a="delFolder" data-id="${f.id}">${I.minus}</button>` : ''}
      <span class="ic">${I.folder}</span><span class="lbl">${esc(f.name)}</span>
      ${folderEdit ? (del ? `<span class="cnt" style="color:var(--gold)">${I.pencil}</span>` : '') : `<span class="cnt">${inFolder(f.id).length}</span><span class="cnt">${I.chevR}</span>`}
    </div>`;
  }).join('');
  return `<h1>Dossiers</h1>
    <div class="sechdr ${col ? 'col' : ''}" data-a="toggleCollapse"><h2>Tous les dossiers</h2><span style="color:var(--sub)">${I.chevD}</span></div>
    ${col ? '' : `<div class="group">${rows}</div>`}
    <div class="group">
      <div class="row" data-a="openTrash"><span class="ic">${I.trash}</span><span class="lbl">Récemment supprimées</span><span class="cnt">${trash().length}</span><span class="cnt">${I.chevR}</span></div>
      <div class="row" data-a="openSettings"><span class="ic">${I.gear}</span><span class="lbl">Paramètres</span><span class="cnt">${I.chevR}</span></div>
    </div>`;
}

/* ---------- list view ---------- */
function vList(id) {
  const isTrash = id === 'trash';
  const right = selMode ? `<button class="pill gold" data-a="endSel">OK</button>` : `<button class="cb" data-a="listMenu">${I.more}</button>`;
  let bottom;
  if (selMode) {
    const dis = selected.size ? '' : 'dis';
    bottom = `<div class="bottom selbar">
      <button class="pill ${dis}" data-a="${isTrash ? 'selRestore' : 'selMove'}">${isTrash ? 'Restaurer' : 'Déplacer'}</button>
      <button class="pill ${dis}" data-a="selDelete" style="color:var(--red)">Supprimer</button></div>`;
  } else bottom = bottomSearch(!isTrash);
  return `<div class="hdr"><button class="cb" data-a="back">${I.back}</button><div class="r">${right}</div></div>
    <div class="scroll" id="content">${listContent(id)}</div>${bottom}`;
}
function listContent(id) {
  const isTrash = id === 'trash';
  const all = isTrash ? trash() : inFolder(id);
  const arr = all.filter(match);
  const name = isTrash ? 'Récemment supprimées' : folderOf(id).name;
  const cnt = selMode ? `${selected.size} sélectionnée${selected.size > 1 ? 's' : ''}` : `${all.length} Note${all.length > 1 ? 's' : ''}`;
  return `<h1>${esc(name)}</h1><div class="count">${cnt}</div>
    ${isTrash && all.length ? '<div class="count" style="margin-top:14px">Les notes sont supprimées définitivement après 30 jours.</div><div style="height:16px"></div>' : ''}
    ${notesBlock(arr, isTrash)}`;
}

/* ---------- settings ---------- */
const SORTS = { modified: 'Modification', created: 'Création', title: 'Titre' };
function vSettings() {
  return `<div class="hdr"><button class="cb" data-a="back">${I.back}</button><span></span></div>
  <div class="scroll set">
    <h1>Paramètres</h1><div style="height:24px"></div>
    <div class="group">
      <div class="row" data-a="pickSort"><span class="lbl">Trier les notes par</span><span class="cnt">${SORTS[db.settings.sort]}</span><span class="cnt">${I.chevR}</span></div>
      <div class="row" data-a="toggleGroup"><span class="lbl">Regrouper par date</span><span class="tog ${db.settings.group ? 'on' : ''}"></span></div>
    </div>
    <div class="group">
      <div class="row" data-a="emptyTrash"><span class="lbl" style="color:var(--red)">Vider Récemment supprimées</span></div>
    </div>
    <div class="foot">${live().length} notes · ${db.folders.length} dossier${db.folders.length > 1 ? 's' : ''}</div>
  </div>`;
}

/* ---------- editor ---------- */
function vEditor(id) {
  const n = db.notes.find(x => x.id === id);
  return `<div class="hdr"><button class="cb" data-a="back">${I.back}</button>
    <div class="r"><div class="pillb"><button data-a="share">${I.share}</button><button data-a="noteMenu">${I.more}</button></div>
    <button class="ok" id="okBtn" data-a="doneEdit" style="display:none">${I.check}</button></div></div>
    <div class="edwrap" id="edwrap">
    <div id="ed" contenteditable="true" spellcheck="true">${n.html || '<div><br></div>'}</div></div>
    <div class="bottom" id="viewBar"><div class="tools"><button data-a="tChecklist">${I.checklist}</button><button data-a="tAttach">${I.clip}</button></div>
      <span class="spacer"></span><button class="compose" data-a="newNote">${I.compose}</button></div>
    <div class="fbar" id="fbar" style="display:none">
      <button data-a="tFormat">Aa</button><button data-a="tChecklist">${I.checklist}</button><button data-a="tTable">${I.table}</button>
      <button data-a="tAttach">${I.clip}</button><button data-a="tList">${I.list}</button></div>`;
}

function setupEditor(focus) {
  ed = document.getElementById('ed');
  edNote = db.notes.find(x => x.id === cur().id);
  document.execCommand('defaultParagraphSeparator', false, 'div');
  normalize();
  ed.addEventListener('focus', () => editing(true));
  ed.addEventListener('blur', () => setTimeout(() => { if (document.activeElement !== ed) editing(false); }, 50));
  ed.addEventListener('input', () => { normalize(); schedule(); });
  ed.addEventListener('keydown', onKey);
  ed.addEventListener('mousedown', e => { if (e.target.classList.contains('box')) e.preventDefault(); });
  ed.addEventListener('click', e => {
    if (e.target.classList.contains('box')) { e.target.parentElement.classList.toggle('on'); schedule(); }
  });
  document.addEventListener('selectionchange', keepRange);
  ['fbar', 'viewBar'].forEach(i => document.getElementById(i).addEventListener('mousedown', e => e.preventDefault()));
  document.getElementById('okBtn').addEventListener('mousedown', e => e.preventDefault());
  if (focus) {
    ed.focus();
    caretEnd(ed.lastElementChild || ed);
  }
}
function keepRange() {
  if (!ed) return;
  const s = getSelection();
  if (s.rangeCount && ed.contains(s.anchorNode)) savedRange = s.getRangeAt(0).cloneRange();
}
function restoreRange() {
  if (!ed) return;
  if (document.activeElement !== ed) ed.focus();
  const s = getSelection();
  if (savedRange && ed.contains(savedRange.startContainer)) { s.removeAllRanges(); s.addRange(savedRange); }
  else caretEnd(ed.lastElementChild || ed);
}
function caretEnd(el) {
  const r = document.createRange(); r.selectNodeContents(el); r.collapse(false);
  const s = getSelection(); s.removeAllRanges(); s.addRange(r);
}
function editing(on) {
  const ok = document.getElementById('okBtn'), fb = document.getElementById('fbar'), vb = document.getElementById('viewBar');
  if (!ok) return;
  ok.style.display = on ? '' : 'none';
  fb.style.display = on ? '' : 'none';
  vb.style.display = on ? 'none' : '';
}
function normalize() {
  if (!ed) return;
  for (const node of [...ed.childNodes]) {
    if (node.nodeType === 3 && node.textContent.trim() !== '') {
      const d = document.createElement('div'); ed.insertBefore(d, node); d.appendChild(node);
      const s = getSelection(); if (s.anchorNode === node) caretEnd(d);
    } else if (node.nodeName === 'BR') {
      const d = document.createElement('div'); ed.insertBefore(d, node); d.appendChild(node);
    }
  }
  if (!ed.firstChild) { ed.innerHTML = '<div><br></div>'; caretEnd(ed.firstChild); }
  ed.querySelectorAll('.ck').forEach(ck => {
    const boxes = ck.querySelectorAll('.box');
    boxes.forEach((b, i) => { if (i > 0 || b.parentElement !== ck) b.remove(); });
    if (!ck.querySelector(':scope > .box')) {
      const b = document.createElement('span'); b.className = 'box'; b.contentEditable = 'false'; ck.prepend(b);
    }
  });
  if (newCk) {
    const b = curBlock(); if (b && b.classList.contains('ck')) b.classList.remove('on');
    newCk = false;
  }
}
function curBlock() {
  const s = getSelection();
  if (!s.rangeCount || !ed) return null;
  let n = s.anchorNode;
  if (!ed.contains(n)) return null;
  if (n === ed) return ed.children[Math.min(s.anchorOffset, ed.children.length - 1)] || null;
  while (n && n.parentNode !== ed) n = n.parentNode;
  if (n && n.nodeType === 3) { const d = document.createElement('div'); ed.insertBefore(d, n); d.appendChild(n); caretEnd(d); return d; }
  return n;
}
function textBeforeCaret(block) {
  const s = getSelection(); if (!s.rangeCount) return '';
  const r = document.createRange(); r.setStart(block, 0);
  r.setEnd(s.getRangeAt(0).startContainer, s.getRangeAt(0).startOffset);
  return r.toString();
}
function onKey(e) {
  const b = curBlock();
  if (!b || !b.classList || !b.classList.contains('ck')) return;
  if (e.key === 'Enter') {
    if (b.textContent.trim() === '') { e.preventDefault(); uncheck(b); }
    else newCk = true;
  } else if (e.key === 'Backspace' && textBeforeCaret(b) === '' && getSelection().isCollapsed) {
    e.preventDefault(); uncheck(b);
  }
}
function uncheck(b) {
  b.classList.remove('ck', 'on');
  b.querySelectorAll('.box').forEach(x => x.remove());
  if (!b.textContent && !b.querySelector('br')) b.innerHTML = '<br>';
  caretEnd(b); schedule();
}
function schedule() { clearTimeout(saveT); saveT = setTimeout(saveNote, 350); }
function saveNote() {
  clearTimeout(saveT);
  if (!ed || !edNote) return;
  const html = ed.innerHTML;
  if (html === edNote.html) return;
  edNote.html = html;
  edNote.text = ed.innerText;
  edNote.modified = Date.now();
  persist();
}
function isEmptyNote(n) { return !(n.text || '').trim() && !/<img|<table/.test(n.html || ''); }
function leaveEditor() {
  if (!edNote) return;
  saveNote();
  if (isEmptyNote(edNote)) db.notes = db.notes.filter(x => x !== edNote), persist();
  document.removeEventListener('selectionchange', keepRange);
  ed = null; edNote = null; savedRange = null;
}

/* ---- editor tools ---- */
function toggleChecklist() {
  restoreRange();
  const b = curBlock(); if (!b || b === ed) return;
  if (b.classList.contains('ck')) uncheck(b);
  else {
    b.classList.add('ck');
    const x = document.createElement('span'); x.className = 'box'; x.contentEditable = 'false'; b.prepend(x);
    caretEnd(b);
  }
  schedule();
}
function setBlock(cls) {
  restoreRange();
  const b = curBlock(); if (!b || b === ed) return;
  b.classList.remove('h1', 'h2', 'h3', 'mono');
  if (cls) b.classList.add(cls);
  schedule();
}
function inline(cmd) { restoreRange(); document.execCommand(cmd); schedule(); }
function insertTable() {
  restoreRange();
  const row = '<tr><td><br></td><td><br></td><td><br></td></tr>';
  document.execCommand('insertHTML', false, `<table><tbody>${row}${row}${row}</tbody></table><div><br></div>`);
  schedule();
}
function attach() {
  keepRange();
  fileInput.value = '';
  fileInput.click();
}
fileInput.addEventListener('change', () => {
  const f = fileInput.files && fileInput.files[0];
  if (!f || !ed) return;
  const rd = new FileReader();
  rd.onload = () => {
    const img = new Image();
    img.onload = () => {
      const max = 1280, k = Math.min(1, max / Math.max(img.width, img.height));
      const c = document.createElement('canvas');
      c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
      const url = c.toDataURL('image/jpeg', 0.72);
      restoreRange();
      document.execCommand('insertHTML', false, `<div><img src="${url}"></div><div><br></div>`);
      schedule();
    };
    img.src = rd.result;
  };
  rd.readAsDataURL(f);
});

/* ================= overlay ================= */
let ovDone = null;
function openOverlay(html, dim) {
  ov.innerHTML = `<div class="scrim ${dim ? 'dim' : ''}"></div>` + html;
  ov.classList.add('show');
  ov.querySelector('.scrim').addEventListener('click', () => closeOverlay(null));
}
function closeOverlay(v) {
  ov.classList.remove('show'); ov.innerHTML = '';
  const d = ovDone; ovDone = null; if (d) d(v === undefined ? null : v);
}
ov.addEventListener('mousedown', e => { if (ed && document.activeElement === ed && !e.target.closest('input')) e.preventDefault(); });

function menu(anchor, items) {
  return new Promise(res => {
    const r = anchor.getBoundingClientRect();
    const html = `<div class="menu" style="top:${r.top}px;right:${innerWidth - r.right}px">` + items.map((it, i) =>
      `<div class="mi ${it.red ? 'red' : ''}" data-i="${i}">${it.check !== undefined ? `<span class="chk">${it.check ? I.checkS : ''}</span>` : ''}${it.icon || ''}<span class="t">${esc(it.label)}${it.sub ? `<span class="s">${esc(it.sub)}</span>` : ''}</span>${it.chev ? I.chevR : ''}</div>`
    ).join('') + '</div>';
    openOverlay(html);
    ovDone = res;
    ov.querySelectorAll('.mi').forEach(el => el.addEventListener('click', () => closeOverlay(+el.dataset.i)));
  });
}
function sheet(title, items) {
  return new Promise(res => {
    const html = `<div class="sheet"><div class="grp">${title ? `<div class="ttl">${esc(title)}</div>` : ''}${items.map((it, i) =>
      `<button class="sb ${it.red ? 'red' : ''}" data-i="${i}" style="${!title && i === 0 ? 'border-top:0' : ''}">${esc(it.label)}</button>`).join('')}</div>
      <div class="grp"><button class="sb bold" data-i="-1" style="border-top:0">Annuler</button></div></div>`;
    openOverlay(html, true);
    ovDone = res;
    ov.querySelectorAll('.sb').forEach(el => el.addEventListener('click', () => closeOverlay(+el.dataset.i < 0 ? null : +el.dataset.i)));
  });
}
function dialog({ title, msg, input, ok = 'OK', red, noCancel }) {
  return new Promise(res => {
    const html = `<div class="dlg"><div class="dt">${esc(title)}</div>${msg ? `<div class="dm">${esc(msg)}</div>` : ''}
      ${input !== undefined ? `<input id="dlgIn" value="${esc(input)}" maxlength="60">` : '<div style="height:14px"></div>'}
      <div class="db">${noCancel ? '' : '<button data-r="0">Annuler</button>'}<button data-r="1" class="${red ? 'red' : ''}">${esc(ok)}</button></div></div>`;
    openOverlay(html, true);
    ovDone = res;
    const inp = document.getElementById('dlgIn');
    if (inp) { setTimeout(() => { inp.focus(); inp.select(); }, 60); inp.addEventListener('keydown', e => { if (e.key === 'Enter') closeOverlay(inp.value.trim()); }); }
    ov.querySelectorAll('.db button').forEach(b => b.addEventListener('click', () => {
      if (b.dataset.r === '0') return closeOverlay(null);
      closeOverlay(inp ? inp.value.trim() : true);
    }));
  });
}

/* ================= actions ================= */
function newNote() {
  const r = cur();
  let fid = 'notes';
  if (r.v === 'list' && r.id !== 'trash') fid = r.id;
  if (r.v === 'editor' && edNote) fid = edNote.folderId;
  const now = Date.now();
  const n = { id: uid(), folderId: fid, html: '<div><br></div>', text: '', created: now, modified: now, deleted: null };
  db.notes.push(n);
  if (r.v === 'editor') { leaveEditor(); stack[stack.length - 1] = { v: 'editor', id: n.id, focus: true }; render(true); }
  else go({ v: 'editor', id: n.id, focus: true });
}
async function moveNotes(ids) {
  const fs = db.folders;
  const i = await sheet('Déplacer vers', fs.map(f => ({ label: f.name })));
  if (i === null) return false;
  ids.forEach(id => { const n = db.notes.find(x => x.id === id); if (n) n.folderId = fs[i].id; });
  persist();
  return true;
}
function trashNotes(ids) {
  const now = Date.now();
  ids.forEach(id => { const n = db.notes.find(x => x.id === id); if (n) n.deleted = now; });
  persist();
}
function restoreNotes(ids) {
  ids.forEach(id => {
    const n = db.notes.find(x => x.id === id);
    if (n) { n.deleted = null; if (!db.folders.find(f => f.id === n.folderId)) n.folderId = 'notes'; }
  });
  persist();
}

const A = {
  back: () => pop(),
  clearQ: () => { query = ''; render(); },
  newNote,
  async newFolder() {
    const name = await dialog({ title: 'Nouveau dossier', msg: 'Saisissez un nom pour ce dossier.', input: 'Nouveau dossier', ok: 'Enregistrer' });
    if (!name) return;
    db.folders.push({ id: uid(), name, created: Date.now() }); persist(); render();
  },
  toggleFolderEdit() { folderEdit = !folderEdit; render(); },
  toggleCollapse() { db.ui.collapsed = !db.ui.collapsed; persist(); render(); },
  openFolder: id => go({ v: 'list', id }),
  openTrash: () => go({ v: 'list', id: 'trash' }),
  openSettings: () => go({ v: 'settings' }),
  async renameFolder(id) {
    const f = folderOf(id);
    const name = await dialog({ title: 'Renommer le dossier', input: f.name, ok: 'Enregistrer' });
    if (!name) return;
    f.name = name; persist(); render();
  },
  async delFolder(id, el, e) {
    e.stopPropagation();
    const f = folderOf(id), c = inFolder(id).length;
    const ok = await dialog({ title: `Supprimer « ${f.name} » ?`, msg: c ? `Les ${c} note${c > 1 ? 's' : ''} de ce dossier seront déplacées dans Récemment supprimées.` : '', ok: 'Supprimer', red: true });
    if (!ok) return;
    trashNotes(inFolder(id).map(n => n.id));
    db.folders = db.folders.filter(x => x.id !== id); persist(); render();
  },
  async open(id) {
    const r = cur();
    if (selMode) {
      selected.has(id) ? selected.delete(id) : selected.add(id);
      render(); return;
    }
    const n = db.notes.find(x => x.id === id);
    if (n.deleted) {
      const i = await sheet('Cette note sera supprimée dans ' + Math.max(1, 30 - Math.floor((Date.now() - n.deleted) / DAY)) + ' jours.', [{ label: 'Restaurer' }, { label: 'Supprimer définitivement', red: true }]);
      if (i === 0) restoreNotes([id]);
      if (i === 1) { db.notes = db.notes.filter(x => x.id !== id); persist(); }
      if (i !== null) render();
      return;
    }
    go({ v: 'editor', id });
  },
  async listMenu(_, el) {
    const id = cur().id;
    if (id === 'trash') {
      const i = await menu(el, [{ icon: I.checkCircle, label: 'Sélectionner des notes' }, { icon: I.trash, label: 'Tout supprimer', red: true }]);
      if (i === 0) { selMode = true; render(); }
      if (i === 1) A.emptyTrash();
      return;
    }
    const i = await menu(el, [
      { icon: I.checkCircle, label: 'Sélectionner des notes' },
      { icon: I.sort, label: 'Trier par', sub: SORTS[db.settings.sort], chev: true },
      { icon: I.gear, label: 'Paramètres' }
    ]);
    if (i === 0) { selMode = true; render(); }
    if (i === 1) {
      const keys = Object.keys(SORTS);
      const j = await menu(el, keys.map(k => ({ label: SORTS[k], check: db.settings.sort === k })));
      if (j !== null) { db.settings.sort = keys[j]; persist(); render(); }
    }
    if (i === 2) go({ v: 'settings' });
  },
  endSel() { selMode = false; selected.clear(); render(); },
  async selMove() {
    if (!selected.size) return;
    if (await moveNotes([...selected])) { selMode = false; selected.clear(); render(); }
  },
  async selDelete() {
    if (!selected.size) return;
    const ids = [...selected];
    if (cur().id === 'trash') {
      const ok = await dialog({ title: 'Supprimer définitivement ?', msg: 'Cette action est irréversible.', ok: 'Supprimer', red: true });
      if (!ok) return;
      db.notes = db.notes.filter(n => !selected.has(n.id)); persist();
    } else trashNotes(ids);
    selMode = false; selected.clear(); render();
  },
  selRestore() { if (!selected.size) return; restoreNotes([...selected]); selMode = false; selected.clear(); render(); },
  async pickSort() {
    const keys = Object.keys(SORTS);
    const i = await sheet('Trier les notes par', keys.map(k => ({ label: SORTS[k] + (db.settings.sort === k ? '  ✓' : '') })));
    if (i !== null) { db.settings.sort = keys[i]; persist(); render(); }
  },
  toggleGroup() { db.settings.group = !db.settings.group; persist(); render(); },
  async emptyTrash() {
    if (!trash().length) return;
    const ok = await dialog({ title: 'Tout supprimer ?', msg: 'Les notes de Récemment supprimées seront effacées définitivement.', ok: 'Supprimer', red: true });
    if (!ok) return;
    db.notes = live(); persist(); render();
  },
  /* editor */
  doneEdit() { saveNote(); ed && ed.blur(); getSelection().removeAllRanges(); editing(false); },
  share() {
    saveNote();
    const n = edNote; if (!n) return;
    const t = titleOf(n), txt = (n.text || '').trim();
    if (window.Android && Android.share) Android.share(t, txt);
    else if (navigator.share) navigator.share({ title: t, text: txt }).catch(() => { });
  },
  async noteMenu(_, el) {
    const i = await menu(el, [{ icon: I.move, label: 'Déplacer la note' }, { icon: I.trash, label: 'Supprimer', red: true }]);
    if (i === 0) { saveNote(); await moveNotes([edNote.id]); }
    if (i === 1) {
      saveNote();
      const n = edNote;
      if (isEmptyNote(n)) { pop(); return; }
      trashNotes([n.id]); edNote = null; ed = null; pop();
    }
  },
  tChecklist: toggleChecklist,
  tAttach: attach,
  tTable: insertTable,
  tList: () => inline('insertUnorderedList'),
  async tFormat() {
    keepRange();
    const opts = [
      ['Titre', () => setBlock('h1')], ['En-tête', () => setBlock('h2')], ['Sous-titre', () => setBlock('h3')],
      ['Corps', () => setBlock('')], ['Monospace', () => setBlock('mono')],
      ['Gras', () => inline('bold')], ['Italique', () => inline('italic')], ['Souligné', () => inline('underline')], ['Barré', () => inline('strikeThrough')]
    ];
    const i = await sheet(null, opts.map(o => ({ label: o[0] })));
    if (i !== null) opts[i][1]();
  }
};

app.addEventListener('click', e => {
  const el = e.target.closest('[data-a]');
  if (!el || !app.contains(el)) return;
  const f = A[el.dataset.a];
  if (f) f(el.dataset.id, el, e);
});

render();
