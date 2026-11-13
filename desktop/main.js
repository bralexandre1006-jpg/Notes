const { app, BrowserWindow, ipcMain, Menu, shell } = require('electron');
const path = require('path');
const fs = require('fs');

if (!app.requestSingleInstanceLock()) app.quit();

let win;
const stateFile = () => path.join(app.getPath('userData'), 'window-v2.json');
function readState() {
  try { return JSON.parse(fs.readFileSync(stateFile(), 'utf8')); } catch (e) { return {}; }
}
function saveState() {
  if (!win || win.isDestroyed()) return;
  try { fs.writeFileSync(stateFile(), JSON.stringify({ ...win.getNormalBounds(), max: win.isMaximized() })); } catch (e) { }
}

function create() {
  const s = readState();
  win = new BrowserWindow({
    width: s.width || 1200,
    height: s.height || 780,
    x: s.x, y: s.y,
    minWidth: 900,
    minHeight: 560,
    show: false,
    frame: false,
    backgroundColor: '#000000',
    icon: path.join(__dirname, 'icon.ico'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      webSecurity: false,
      spellcheck: true,
      backgroundThrottling: false
    }
  });
  if (s.max) win.maximize();
  win.once('ready-to-show', () => win.show());
  win.on('close', saveState);
  win.on('maximize', () => win.webContents.send('max', true));
  win.on('unmaximize', () => win.webContents.send('max', false));
  win.webContents.on('did-finish-load', () => win.webContents.send('max', win.isMaximized()));
  win.webContents.on('will-navigate', (e, url) => { if (!url.startsWith('file:')) { e.preventDefault(); shell.openExternal(url); } });
  win.webContents.setWindowOpenHandler(({ url }) => { if (/^https?:/.test(url)) shell.openExternal(url); return { action: 'deny' }; });
  win.webContents.session.setSpellCheckerLanguages(['fr']);
  win.webContents.on('context-menu', (e, p) => {
    win.webContents.send('ctx', { x: p.x, y: p.y, word: p.misspelledWord || '', sug: (p.dictionarySuggestions || []).slice(0, 5), editable: p.isEditable, sel: !!p.selectionText, f: p.editFlags });
  });
  win.loadFile(path.join(__dirname, 'www', 'index.html'));
}

ipcMain.on('save-file', (e, name, content) => {
  try {
    fs.writeFileSync(path.join(app.getPath('downloads'), path.basename(name)), content, 'utf8');
    e.returnValue = true;
  } catch (err) { e.returnValue = false; }
});

ipcMain.on('win', (e, a) => {
  if (!win) return;
  if (a === 'min') win.minimize();
  if (a === 'max') win.isMaximized() ? win.unmaximize() : win.maximize();
  if (a === 'close') win.close();
});

ipcMain.on('ctx', (e, a, w) => {
  if (!win) return;
  const wc = win.webContents;
  if (a === 'cut') wc.cut();
  if (a === 'copy') wc.copy();
  if (a === 'paste') wc.paste();
  if (a === 'selectAll') wc.selectAll();
  if (a === 'fix' && w) wc.replaceMisspelling(w);
  if (a === 'learn' && w) wc.session.addWordToSpellCheckerDictionary(w);
});

Menu.setApplicationMenu(null);
app.on('second-instance', () => { if (win) { if (win.isMinimized()) win.restore(); win.focus(); } });
app.whenReady().then(create);
app.on('window-all-closed', () => app.quit());
