const dbAccess = require("./dbAccess");
const fetcher = require("./fetcher");
/**
 * 
 * @param {Electron.ipcMain} ipcMain 
 */
const addEvents = (ipcMain) => {
  ipcMain.on("update:rules:position", (e, rules_wrapper) => {
    dbAccess.updateRulesPositions(rules_wrapper).then((resp)=>{
      console.log(resp)
      e.sender.send("rules:position:updated", { ok: true});
    })
  })
  ipcMain.on("check:rules", (e, rules) => {
    console.log("check", rules);
    let id = 0;
    for (const rule of rules) {
      let channel = `rule:checked:${id}`
      console.log(id , channel);
      dbAccess
        .checkIfRuleAlreadyExist(rule)
        .then(function (count) {
          if(count <= 0){
            // the origin is good then let test the target
            fetcher.testResponse(rule.target)
            .then((response_code)=>{
              if(response_code >=200 && response_code < 300) {
                e.sender.send(channel, { ok: true, rule: rule ,reason:`the rule with origin '${rule.origin}' and target '${rule.target}' is ok`,reason_code:response_code,channel:channel});
              }
              if(response_code >=300 && response_code < 400) {
                e.sender.send(channel, { ok: true, rule: rule ,reason:`the rule with origin '${rule.origin}' and target '${rule.target}' is redirected`,reason_code:response_code,channel:channel});
              }
              else {
                e.sender.send(channel, { ok: false, rule: rule ,reason:`the target '${rule.target}' of the rule with origin '${rule.origin}' does not exist`,reason_code:response_code,channel:channel});
              }
            }).catch((error)=>{
              e.sender.send(channel, { ok: false, rule: rule ,reason:error.message,reason_code:500,channel:channel});
            })
          } else {
            // the origin already exist
            e.sender.send(channel, { ok: false, rule: rule ,reason:`the rule with origin '${rule.origin}' already exist`,reason_code:1,channel:channel});
          }
          
        })
        .catch(function (error) {
          console.log(error);
          e.sender.send(channel, { ok: false, rule: rule ,reason:error.message,reason_code:500,channel:channel});
        });
        id++;
    }
  });
};
exports.addEvents = addEvents;
