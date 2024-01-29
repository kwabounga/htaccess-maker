const dbAccess = require("../dbAccess");
const logger = require('../logger')
/**
 *
 * @param {Electron.ipcMain} ipcMain
 */
 const addBatchProcessingEvents = (ipcMain) => {

  ipcMain.on("batch:rules:comment", (e, rulesIds,scope_id) => {
    dbAccess.batchRulesComment(rulesIds,false, scope_id).then((resp)=>{
      // console.log(resp)
      logger.log('comment rules: ' + rulesIds.join(','));
      e.sender.send("batch:rules:commented", { ok: true});
    })
  })

  ipcMain.on("batch:rules:uncomment", (e, rulesIds,scope_id) => {
    dbAccess.batchRulesComment(rulesIds, true, scope_id).then((resp)=>{
      // console.log(resp)
      e.sender.send("batch:rules:uncommented", { ok: true});
    })
  })

}

exports.addBatchProcessingEvents = addBatchProcessingEvents;
