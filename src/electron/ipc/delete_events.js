const dbAccess = require("../dbAccess");

/**
 *
 * @param {Electron.ipcMain} ipcMain
 */
 const addGetEventsDelete = (ipcMain) => {
  ipcMain.on("delete:rule", (e, rule) => {
    // console.log('delete:rule')
    dbAccess.deleteRule(rule).then((resp)=>{
      // console.log(resp)
      e.sender.send("rule:deleted", { ok: true});
    })
  })

  ipcMain.on("delete:scope", (e, scope_id) => {
    // console.log('delete:scope')
    dbAccess.deleteScope(scope_id).then((resp)=>{
      // console.log(resp)
      e.sender.send("scope:deleted", { ok: true, scope_deleted_id: scope_id});
    })
  })
}

exports.addGetEventsDelete = addGetEventsDelete;