

/**
 *
 * @param {Electron.ipcMain} ipcMain
 */
const addAppEvents = (ipcMain, win, app, store) => {

  ipcMain.on("app:close", (e) => {
    win.close();
  })

  ipcMain.on("app:reload", (e) => {
    app.relaunch();
    app.exit();
  })


  ipcMain.on("get:local:storage", (e) => {
    console.log(store.store.app)
    e.sender.send("retrieve:local:storage", store.store.app);
  })

  ipcMain.on("set:local:storage:info", (e, info) => {
    console.log(info)
    Object.keys(info).forEach((key)=>{
      store.set(`app.${key}`, info[key]);
    })
    e.sender.send("local:storage:info:set", info);
  })

}


exports.addAppEvents = addAppEvents;
