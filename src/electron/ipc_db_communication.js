const dbAccess = require("./dbAccess");
const fetcher = require("./fetcher");
/**
 * 
 * @param {Electron.ipcMain} ipcMain 
 */
const addEvents = (ipcMain) => {
  ipcMain.on("check:rules", (e, rules) => {
    console.log("check", rules);
    for (const rule of rules) {
      dbAccess
        .checkIfRuleAlreadyExist(rule)
        .then(function (count) {
          if(count <= 0){
            // the origin is good then let test the target
            fetcher.testResponse(rule.target)
            .then((response_code)=>{
              if(response_code >=200 && response_code < 300) {
                e.sender.send("rule:checked", { ok: true, rule: rule ,reason:`the rule with origin '${rule.origin}' and target '${rule.target}' is ok`,reason_code:response_code});
              }
              if(response_code >=300 && response_code < 400) {
                e.sender.send("rule:checked", { ok: true, rule: rule ,reason:`the rule with origin '${rule.origin}' and target '${rule.target}' is redirected`,reason_code:response_code});
              }
              else {
                e.sender.send("rule:checked", { ok: false, rule: rule ,reason:`the target '${rule.target}' of the rule with origin '${rule.origin}' does not exist`,reason_code:response_code});
              }
            }).catch((error)=>{
              e.sender.send("rule:checked", { ok: false, rule: rule ,reason:error.message,reason_code:0});
            })
          } else {
            // the origin already exist
            e.sender.send("rule:checked", { ok: false, rule: rule ,reason:`the rule with origin '${rule.origin}' already exist`,reason_code:1});
          }
          
        })
        .catch(function (error) {
          console.log(error);
          e.sender.send("rule:checked", { ok: false, rule: rule ,reason:error.message,reason_code:0});
        });
    }
  });
};
exports.addEvents = addEvents;
