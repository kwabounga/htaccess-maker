

/**
 *
 * @param {Electron.ipcMain} ipcMain
 */
const addAppEvents = (ipcMain) => {

  ipcMain.on("app:close", (e) => {
    process.exit(0);
  })
  
}


exports.addAppEvents = addAppEvents;
