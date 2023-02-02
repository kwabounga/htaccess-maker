const dbAccess = require("../dbAccess");

/**
 *
 * @param {Electron.ipcMain} ipcMain
 */
 const addBatchProcessingEvents = (ipcMain) => {

  ipcMain.on("batch:rules:comment", (e, rulesIds) => {
    dbAccess.batchRulesComment(rulesIds).then((resp)=>{
      // console.log(resp)
      e.sender.send("batch:rules:commented", { ok: true});
    })
  })

  ipcMain.on("batch:rules:uncomment", (e, rulesIds) => {
    dbAccess.batchRulesComment(rulesIds, true).then((resp)=>{
      // console.log(resp)
      e.sender.send("batch:rules:uncommented", { ok: true});
    })
  })

}

exports.addBatchProcessingEvents = addBatchProcessingEvents;