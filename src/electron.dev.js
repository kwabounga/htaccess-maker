const { app, BrowserWindow,ipcMain,ipcRenderer,session } = require('electron');
const path = require('path');
const url = require('url');
const Store = require('electron-store');
const ipcCom = require("./electron/ipc_db_communication");
const ipcApp = require("./electron/ipc_app_actions");
const schema = require('./electron/localStorage');
const pjson = require('./package.json');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;
const store = new Store(schema);

// store is  created config.json file here:
console.log('user',app.getPath('userData'));
console.log('app',app.getPath('appData'));


const createWindow = () => {

    // set timeout to render the window not until the Angular
    // compiler is ready to show the project
    setTimeout(() => {
        // Create the browser window.
        win = new BrowserWindow({
            width: store.get('app.width'),
            height: store.get('app.height'),
            minWidth: store.get('app.minWidth'),
            minHeight: store.get('app.minHeight'),
            x: store.get('app.x'),
            y: store.get('app.y'),
            frame:false,
            titleBarStyle: "hidden",
            /* transparent: true, */
            /* titleBarOverlay: true, */
            alwaysOnTop: false,
            icon: path.join(__dirname, pjson.icon),
            webPreferences: { nodeIntegration: true, preload: path.join(__dirname, "preload.js"), enableRemoteModule: true, contextIsolation: false, allowRunningInsecureContent: false },
            ipcRenderer: ipcRenderer,
            isElectron: true,
            title: pjson.productName
            /* https://thenounproject.com/icon/redirect-36771/ */
        });

        // and load the app.
        win.loadURL(url.format({
            pathname: 'localhost:2345',
            protocol: 'http:',
            slashes: true
        }));

        // opening dev tool in dev mode
        win.webContents.openDevTools();

        // show the main windows when ready
        win.once("ready-to-show", () => {
            win.show();
          });

        // Emitted when the window is going to be closed.
        win.on('close', () => {
          console.log('before close : save bounds')
          console.log(win.getBounds())
          let bounds = win.getBounds();
          store.set('app.x',bounds.x);
          store.set('app.y',bounds.y);
          store.set('app.height', bounds.height);
          store.set('app.width', bounds.width);
        });

        // Emitted when the window is closed.
        win.on('closed', () => {
            // Dereference the window object, usually you would store windows
            // in an array if your app supports multi windows, this is the time
            // when you should delete the corresponding element.
            win = null;
        });

        // add app events when win object is created
        ipcApp.addAppEvents(ipcMain, win, app, store);
    }, 10000);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();

    }
    // app.quit();
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow();
    }
});

// ipc and electron
/// https://github.com/DenisKolodin/tsng2/tree/master/src

// add front < > back communication
app.whenReady().then(()=>{
  ipcCom.addEvents(ipcMain);
})

