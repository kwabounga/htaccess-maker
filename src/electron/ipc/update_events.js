const dbAccess = require("../dbAccess");

/**
 *
 * @param {Electron.ipcMain} ipcMain
 */
 const addEventsUpdate = (ipcMain) => {

  ipcMain.on("update:header:config", (e, config) => {
    dbAccess.updateHeaderConfig(config).then((resp)=>{
      // console.log(resp)
      e.sender.send("header:config:updated", { ok: true});
    })
  })
  ipcMain.on("update:footer:config", (e, config) => {
    dbAccess.updateFooterConfig(config).then((resp)=>{
      // console.log(resp)
      e.sender.send("footer:config:updated", { ok: true});
    })
  })

  ipcMain.on("update:rules:position", (e, rules_wrapper) => {
    dbAccess.updateRulesPositions(rules_wrapper).then((resp)=>{
      // console.log(resp)
      e.sender.send("rules:position:updated", { ok: true});
    })
  })
  ipcMain.on("update:scope", (e, scope) => {
    // console.log('update:scope')
    dbAccess.updateScope(scope).then((resp)=>{
      // console.log(resp)
      e.sender.send("scope:updated", { ok: true});
    })
  })
  ipcMain.on("update:scope:config", (e, scope) => {
    // console.log('update:scope:config')
    dbAccess.updateScopeConfig(scope).then((resp)=>{
      // console.log(resp)
      e.sender.send("scope:config:updated", { ok: true});
    })
  })
ipcMain.on("update:scopes:position", (e, scopes_wrapper) => {
    // console.log('update:scopes:position')
    dbAccess.updateScopesPositions(scopes_wrapper).then((resp)=>{
      // console.log(resp)
      e.sender.send("scopes:position:updated", { ok: true});
    })
  })

  ipcMain.on("update:rule", (e, rule) => {
    // console.log('update:rule')
    dbAccess.updateRule(rule).then((resp)=>{
      // console.log(resp)
      e.sender.send("rule:updated", { ok: true});
    })
  })

  ipcMain.on("update:rules", (e, rules) => {
    // console.log('update:rules',rules)
    dbAccess.updateRules(rules).then((resp)=>{
      // console.log(resp)
      e.sender.send("rules:updated", { ok: true});
    })
  })

}

exports.addEventsUpdate = addEventsUpdate;