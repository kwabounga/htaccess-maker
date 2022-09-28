const dbAccess = require("../dbAccess");

/**
 *
 * @param {Electron.ipcMain} ipcMain
 */
 const addEventsGet = (ipcMain) => {

  ipcMain.on("get:header_config", (e) => {
    dbAccess.getHeaderConfig().then((header_config)=>{
      const data = header_config[0];
      // console.log(data);
      e.sender.send("retrieve:header_config", data.config);
    }).catch((error)=>{
      e.sender.send("retrieve:header_config", error.message);
    })
  })
  ipcMain.on("get:footer_config", (e) => {
    dbAccess.getFooterConfig().then((footer_config)=>{
      const data = footer_config[0];
      // console.log(data);
      e.sender.send("retrieve:footer_config", data.config);
    }).catch((error)=>{
      e.sender.send("retrieve:footer_config", error.message);
    })
  })
  ipcMain.on("get:scopes", (e) => {
    dbAccess.getScopesAll().then((scopes)=>{
      const data = scopes;
      // console.log(data);
      e.sender.send("retrieve:scopes", data);
    }).catch((error)=>{
      e.sender.send("retrieve:scopes", error.message);
    })
  })


  ipcMain.on("get:redirect_types", (e) => {
    dbAccess.getRedirectTypesAll().then((redirect_types)=>{
      const data = redirect_types;
      // console.log(data);
      e.sender.send("retrieve:redirect_types", data);
    }).catch((error)=>{
      e.sender.send("retrieve:redirect_types", error.message);
    })
  })

  ipcMain.on("get:redirect_types:by_id", (e,id) => {
    dbAccess.getRedirectTypesByID(id).then((redirect_types)=>{
      const data = redirect_types[0];
      // console.log('getRedirectTypesById', data);
      e.sender.send(`retrieve:redirect_types:by_id_${id}`, data);
    }).catch((error)=>{
      e.sender.send(`retrieve:redirect_types:by_id_${id}`, error.message);
    })
  })
  ipcMain.on("get:scope:by_magento_id", (e,id) => {
    dbAccess.getScopeByMagentoID(id).then((scope)=>{
      const data = scope[0];
      // console.log('getScopeByMagentoID', data);
      e.sender.send(`retrieve:scope:by_magento_id_${id}`, data);
    }).catch((error)=>{
      e.sender.send(`retrieve:scope:by_magento_id_${id}`, error.message);
    })
  })

  ipcMain.on("get:scope_config:by_id", (e,id) => {
    dbAccess.getScopeConfigByScopeID(id).then((scope_config)=>{
      const data = scope_config[0];
      // console.log('getScopeConfigByScopeID', data);
      e.sender.send(`retrieve:scope_config:by_id_${id}`, data);
    }).catch((error)=>{
      e.sender.send(`retrieve:scope_config:by_id_${id}`, error.message);
    })
  })
  ipcMain.on("get:scope:by_id", (e,id) => {
    dbAccess.getScopesById(id).then((scope)=>{
      const data = scope[0];
      // console.log('getScopeByScopeID', data);
      e.sender.send(`retrieve:scope:by_id_${id}`, data);
    }).catch((error)=>{
      e.sender.send(`retrieve:scope:by_id_${id}`, error.message);
    })
  })
  ipcMain.on("get:rules:by_scope_id", (e,scope_id) => {
    dbAccess.getRulesByScopeId(scope_id).then((rules)=>{
      const data = rules;
      // console.log('getRulesByScopeID', data);
      e.sender.send(`retrieve:rules:by_scope_id_${scope_id}`, data);
    }).catch((error)=>{
      e.sender.send(`retrieve:rules:by_scope_id_${scope_id}`, error.message);
    })
  })
  ipcMain.on("get:history", (e) => {
    dbAccess.getHistory().then((histories)=>{
      const data = histories;
      // console.log('getRulesByScopeID', data);
      e.sender.send(`retrieve:history`, data);
    }).catch((error)=>{
      e.sender.send(`retrieve:history`, error.message);
    })
  })
}

exports.addEventsGet = addEventsGet;
