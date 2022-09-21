

/**
 *
 * @param {Electron.ipcMain} ipcMain
 */
const addAppEvents = (ipcMain,win) => {

  ipcMain.on("app:close", (e) => {
    win.close();
  })
  
}


exports.addAppEvents = addAppEvents;
