

/**
 *
 * @param {Electron.ipcMain} ipcMain
 */
const addAppEvents = (ipcMain, win, app) => {

  ipcMain.on("app:close", (e) => {
    win.close();
  })

  ipcMain.on("app:reload", (e) => {
    app.relaunch();
    app.exit();
  })

}


exports.addAppEvents = addAppEvents;
