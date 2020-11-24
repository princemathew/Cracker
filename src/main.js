const { app, BrowserWindow,ipcMain,dialog } = require('electron')
const pty = require("node-pty");
const os = require("os");
const fs =  require("path");
var shell = os.platform() === "win32" ? "powershell.exe" : "bash";

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      enableremotemodule: true,
      nodeIntegration: true
    }
  })
  win.maximize()
  win.loadFile('src/crack.html')
  win.webContents.executeJavaScript('localStorage.setItem("clickcount",0);', true);
  //win.removeMenu();
  var ptyProcess = pty.spawn(shell, [], {
    name: "xterm-color",
    cols: 80,
    rows: 30,
    cwd: process.env.HOME,
    env: process.env
});
ptyProcess.on('data', function(data) {
    win.webContents.send("terminal.incomingData", data);
});
ipcMain.on("terminal.keystroke", (event, key) => {
    ptyProcess.write(key);
});

ipcMain.handle("open.file", async(event,dialogOptionts)=>{
  let filepath = await dialog.showOpenDialog(win, dialogOptionts);
  filepath = filepath.filePaths[0].toString()
  return filepath
});

}
app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

