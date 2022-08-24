const dbAccess = require("./dbAccess");
const fetcher = require("./fetcher");

/**
 *
 * @param {Electron.ipcMain} ipcMain
 */
const addEventsGet = (ipcMain) => {

  ipcMain.on("get:header_config", (e) => {
    dbAccess.getHeaderConfig().then((header_config)=>{
      const data = header_config[0];
      console.log(data);
      e.sender.send("retrieve:header_config", data.config);
    }).catch((error)=>{
      e.sender.send("retrieve:header_config", error.message);
    })
  })
  ipcMain.on("get:footer_config", (e) => {
    dbAccess.getFooterConfig().then((footer_config)=>{
      const data = footer_config[0];
      console.log(data);
      e.sender.send("retrieve:footer_config", data.config);
    }).catch((error)=>{
      e.sender.send("retrieve:footer_config", error.message);
    })
  })
  ipcMain.on("get:scopes", (e) => {
    dbAccess.getScopesAll().then((scopes)=>{
      const data = scopes;
      console.log(data);
      e.sender.send("retrieve:scopes", data);
    }).catch((error)=>{
      e.sender.send("retrieve:scopes", error.message);
    })
  })
  ipcMain.on("get:scopes_config", (e) => {
    dbAccess.getFooterConfig().then((scopes_config)=>{
      const data = scopes_config;
      console.log(data);
      e.sender.send("retrieve:scopes_config", data);
    }).catch((error)=>{
      e.sender.send("retrieve:scopes_config", error.message);
    })
  })

  ipcMain.on("get:redirect_types", (e) => {
    dbAccess.getRedirectTypesAll().then((redirect_types)=>{
      const data = redirect_types;
      console.log(data);
      e.sender.send("retrieve:redirect_types", data);
    }).catch((error)=>{
      e.sender.send("retrieve:redirect_types", error.message);
    })
  })

  ipcMain.on("get:redirect_types:by_id", (e,id) => {
    dbAccess.getRedirectTypesByID(id).then((redirect_types)=>{
      const data = redirect_types[0];
      console.log('getRedirectTypesById', data);
      e.sender.send(`retrieve:redirect_types:by_id_${id}`, data);
    }).catch((error)=>{
      e.sender.send(`retrieve:redirect_types:by_id_${id}`, error.message);
    })
  })
  ipcMain.on("get:scope:by_magento_id", (e,id) => {
    dbAccess.getScopeByMagentoID(id).then((scope)=>{
      const data = scope[0];
      console.log('getScopeByMagentoID', data);
      e.sender.send(`retrieve:scope:by_magento_id_${id}`, data);
    }).catch((error)=>{
      e.sender.send(`retrieve:scope:by_magento_id_${id}`, error.message);
    })
  })

  ipcMain.on("get:scope_config:by_id", (e,id) => {
    dbAccess.getScopeConfigByScopeID(id).then((scope_config)=>{
      const data = scope_config[0];
      console.log('getScopeConfigByScopeID', data);
      e.sender.send(`retrieve:scope_config:by_id_${id}`, data);
    }).catch((error)=>{
      e.sender.send(`retrieve:scope_config:by_id_${id}`, error.message);
    })
  })
  ipcMain.on("get:scope:by_id", (e,id) => {
    dbAccess.getScopesById(id).then((scope)=>{
      const data = scope[0];
      console.log('getScopeByScopeID', data);
      e.sender.send(`retrieve:scope:by_id_${id}`, data);
    }).catch((error)=>{
      e.sender.send(`retrieve:scope:by_id_${id}`, error.message);
    })
  })
  ipcMain.on("get:rules:by_scope_id", (e,scope_id) => {
    dbAccess.getRulesByScopeId(scope_id).then((rules)=>{
      const data = rules;
      console.log('getRulesByScopeID', data);
      e.sender.send(`retrieve:rules:by_scope_id_${scope_id}`, data);
    }).catch((error)=>{
      e.sender.send(`retrieve:rules:by_scope_id_${scope_id}`, error.message);
    })
  })
}
const addEventsUpdate = (ipcMain) => {

  ipcMain.on("update:header:config", (e, config) => {
    dbAccess.updateHeaderConfig(config).then((resp)=>{
      console.log(resp)
      e.sender.send("header:config:updated", { ok: true});
    })
  })
  ipcMain.on("update:footer:config", (e, config) => {
    dbAccess.updateFooterConfig(config).then((resp)=>{
      console.log(resp)
      e.sender.send("footer:config:updated", { ok: true});
    })
  })

  ipcMain.on("update:rules:position", (e, rules_wrapper) => {
    dbAccess.updateRulesPositions(rules_wrapper).then((resp)=>{
      console.log(resp)
      e.sender.send("rules:position:updated", { ok: true});
    })
  })
  ipcMain.on("update:scopes:position", (e, scopes_wrapper) => {
    console.log('update:scopes:position')
    dbAccess.updateScopesPositions(scopes_wrapper).then((resp)=>{
      console.log(resp)
      e.sender.send("scopes:position:updated", { ok: true});
    })
  })

  ipcMain.on("update:rule", (e, rule) => {
    console.log('update:rule')
    dbAccess.updateRule(rule).then((resp)=>{
      console.log(resp)
      e.sender.send("rule:updated", { ok: true});
    })
  })

}
/**
 *
 * @param {Electron.ipcMain} ipcMain
 */
const addGetEventsInsert = (ipcMain) => {
  ipcMain.on("add:rules", (e, rules) => {
    dbAccess.insertRules(rules).then((resp)=>{
      console.log(resp)
      e.sender.send("rules:added", true);
    })
  })

}


/**
 *
 * @param {Electron.ipcMain} ipcMain
 */
const addGetEventsDelete = (ipcMain) => {
  ipcMain.on("delete:rule", (e, rule) => {
    console.log('delete:rule')
    dbAccess.deleteRule(rule).then((resp)=>{
      console.log(resp)
      e.sender.send("rule:deleted", { ok: true});
    })
  })
}
/**
 *
 * @param {Electron.ipcMain} ipcMain
 */
const addGetEventsCheck = (ipcMain) => {
  ipcMain.on("check:rules", (e, rules) => {
    console.log("check", rules);
    let id = 0;
    for (const rule of rules) {
      // building channel for event
      let channel = `rule:checked:${id}`
      console.log(id, channel);

      // HARD LOOP TEST
      let regex = dbAccess.REGEX_URL;
      let tUrl = rule.target.match(regex)[1]
      if(tUrl.trim() !=''){
        let rOri = (rule.origin.slice(-1) == '/')?rule.origin.slice(0,-1):rule.origin;
        let rTar = (tUrl.slice(-1) == '/')?tUrl.slice(0,-1):tUrl;
        
        if(rOri == rTar){
          e.sender.send(channel, { ok: false, rule: rule, reason: `ERROR with the rule (origin '${rule.origin}'): the target '${rule.target}' redirect to the origin (HARD LOOP)`, reason_code: 3, channel: channel });
        }
      }

      dbAccess
        .checkIfRuleAlreadyExist(rule)
        .then((rows) => {
          let count = rows.length
          if (count <= 0) {
            // the origin is good then test if the target is redirected itself (loop)
            dbAccess.verifyRedirectionLoop(rule)
              .then((count) => {
                if (count <= 0) {
                  // the origin and the target are goods then let test the target http response
                  fetcher.testResponse(rule.target)
                    .then((response_code) => {
                      if (response_code >= 200 && response_code < 300) {
                        e.sender.send(channel, { ok: true, rule: rule, reason: `the rule with origin '${rule.origin}' and target '${rule.target}' is ok`, reason_code: response_code, channel: channel });
                      }
                      if (response_code >= 300 && response_code < 400) {
                        e.sender.send(channel, { ok: true, rule: rule, reason: `the rule with origin '${rule.origin}' and target '${rule.target}' is redirected`, reason_code: response_code, channel: channel });
                      }
                      else {
                        e.sender.send(channel, { ok: false, rule: rule, reason: `the target '${rule.target}' of the rule with origin '${rule.origin}' does not exist`, reason_code: response_code, channel: channel });
                      }
                    }).catch((error) => {
                      e.sender.send(channel, { ok: false, rule: rule, reason: error.message, reason_code: 500, channel: channel });
                    })
                } else {
                  // is already redirected
                  e.sender.send(channel, { ok: false, rule: rule, reason: `error with the rule (origin '${rule.origin}'): the target '${rule.target}' is already redirected (soft loop)`, reason_code: 2, channel: channel });
                }
              })

          } else {
            // the origin already exist
            e.sender.send(channel, { ok: false, rule: rule, registered_rules: rows, reason: `the rule with origin '${rule.origin}' already exist`, reason_code: 1, channel: channel });
          }

        })
        .catch(function (error) {
          console.log(error);
          e.sender.send(channel, { ok: false, rule: rule, reason: error.message, reason_code: 500, channel: channel });
        });
      id++;
    }
  });


}

/**
 *
 * @param {Electron.ipcMain} ipcMain
 */
const addEvents = (ipcMain) => {
  addEventsGet(ipcMain);
  addEventsUpdate(ipcMain);
  addGetEventsCheck(ipcMain);
  addGetEventsInsert(ipcMain);
  addGetEventsDelete(ipcMain);

};

exports.addEvents = addEvents;
