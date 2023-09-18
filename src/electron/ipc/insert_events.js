const dbAccess = require("../dbAccess");

/**
 *
 * @param {Electron.ipcMain} ipcMain
 */
 const addGetEventsInsert = (ipcMain) => {
  ipcMain.on("add:rules", (e, rules) => {
    dbAccess.insertRules(rules).then((resp)=>{
      // console.log(resp)
      e.sender.send("rules:added", true);
    })
  })
  ipcMain.on("add:locked_rules", (e, lockedRules) => {
    dbAccess.insertLockedRules(lockedRules).then((resp)=>{
      // console.log(resp)
      e.sender.send("locked_rules:added", true);
    })
  })

  ipcMain.on("add:scope", (e, scope) => {
    dbAccess.insertScopes(scope).then((resp)=>{
      // console.log(resp)
      e.sender.send("scope:added", resp);
    })
  })
  ipcMain.on("add:scope:config", (e, scopeConfig) => {
    dbAccess.insertScopesConfig(scopeConfig).then((resp)=>{
      // console.log(resp)
      e.sender.send("scope:config:added", resp);
    })
  })

}

exports.addGetEventsInsert = addGetEventsInsert;
