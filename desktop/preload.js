const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('Desktop', true);
contextBridge.exposeInMainWorld('Android', {
  saveFile: (name, content) => ipcRenderer.sendSync('save-file', name, content),
  haptic: () => { }
});

window.addEventListener('DOMContentLoaded', () => {
  document.documentElement.classList.add('desktop');
  const st = document.createElement('style');
  st.textContent = `
    html.desktop{--st:36px}
    html.desktop body::before{content:"";position:fixed;top:0;left:0;right:0;height:36px;-webkit-app-region:drag;z-index:2147483647}
    html.desktop *{cursor:default}
    html.desktop input,html.desktop [contenteditable]{cursor:text}
  `;
  document.head.appendChild(st);
});
