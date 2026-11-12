const { app, BrowserWindow, ipcMain, Menu, shell } = require('electron');
const path = require('path');
const fs = require('fs');

if (!app.requestSingleInstanceLock()) app.quit();

let win;
const stateFile = () => path.join(app.getPath('userData'), 'window.json');
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
    width: s.width || 440,
    height: s.height || 900,
    x: s.x, y: s.y,
    minWidth: 360,
    minHeight: 560,
    show: false,
    backgroundColor: '#000000',
    titleBarStyle: 'hidden',
    titleBarOverlay: { color: '#000000', symbolColor: '#ffffff', height: 36 },
    icon: path.join(__dirname, 'icon.png'),
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
  win.webContents.on('will-navigate', (e, url) => { if (!url.startsWith('file:')) { e.preventDefault(); shell.openExternal(url); } });
  win.webContents.setWindowOpenHandler(({ url }) => { if (/^https?:/.test(url)) shell.openExternal(url); return { action: 'deny' }; });
  win.webContents.session.setSpellCheckerLanguages(['fr']);
  win.loadFile(path.join(__dirname, 'www', 'index.html'));
}

ipcMain.on('save-file', (e, name, content) => {
  try {
    fs.writeFileSync(path.join(app.getPath('downloads'), path.basename(name)), content, 'utf8');
    e.returnValue = true;
  } catch (err) { e.returnValue = false; }
});

Menu.setApplicationMenu(null);
app.on('second-instance', () => { if (win) { if (win.isMinimized()) win.restore(); win.focus(); } });
app.whenReady().then(create);
app.on('window-all-closed', () => app.quit());
