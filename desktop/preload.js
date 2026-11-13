const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('Desktop', {
  win: a => ipcRenderer.send('win', a),
  onMax: f => ipcRenderer.on('max', (e, v) => f(!!v)),
  onCtx: f => ipcRenderer.on('ctx', (e, p) => f(p)),
  ctx: (a, w) => ipcRenderer.send('ctx', a, w)
});
contextBridge.exposeInMainWorld('Android', {
  saveFile: (name, content) => ipcRenderer.sendSync('save-file', name, content),
  haptic: () => { }
});
