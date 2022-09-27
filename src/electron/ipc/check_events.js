const dbAccess = require("../dbAccess");
const fetcher = require("../fetcher");

/**
 * Reason Codes
 */
 const RC = {
  HARDLOOP:333,
  EXISTYET:111,
  SOFTLOOP:322,
  UNKNOWN:500,
}

/**
 *
 * @param {Electron.ipcMain} ipcMain
 */
 const addGetEventsCheck = (ipcMain) => {
  ipcMain.on("online:check", (e, scope_id) => {
    // console.log('online:check')
    fetcher.testResponse('https://www.google.fr/').then((resp)=>{
      // console.log(resp)
      e.sender.send("checked:online", { ok: true, resp });
    }).catch((reason)=>{
      e.sender.send("checked:online", { ok: false, reason });
    })
  })
  

  ipcMain.on("check:rules", (e, rules) => {
    // console.log("check", rules);
    let id = 0;
    for (const rule of rules) {
      // building channel for event
      let channel = `rule:checked:${id}`
      // console.log(id, channel);

      // HARD LOOP TEST
      if(isHardLoop(rule)){
        e.sender.send(channel, { ok: false, rule: rule, reason: `ERROR with the rule (origin '${rule.origin}'): the target '${rule.target}' redirect to the origin (HARD LOOP)`, reason_code: RC.HARDLOOP, channel: channel });
      }
      /* let regex = dbAccess.REGEX_URL;
      let tUrl = rule.target.match(regex)[1]
      if(tUrl.trim() !=''){
        let rOri = (rule.origin.slice(-1) == '/')?rule.origin.slice(0,-1):rule.origin;
        let rTar = (tUrl.slice(-1) == '/')?tUrl.slice(0,-1):tUrl;

        if(rOri == rTar){
          e.sender.send(channel, { ok: false, rule: rule, reason: `ERROR with the rule (origin '${rule.origin}'): the target '${rule.target}' redirect to the origin (HARD LOOP)`, reason_code: RC.HARDLOOP, channel: channel });
        }
      } */

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
                    .then(async (response_code) => {
                      if (response_code >= 200 && response_code < 300) {
                        let byOriginResponses = await dbAccess.getRulesByOrigin(rule.origin).then((byOriginResponses)=>{
                          console.log('byOriginResponses', byOriginResponses)
                          return byOriginResponses;
                        })
                        e.sender.send(channel, { ok: true, rule: rule, reason: `the rule with origin '${rule.origin}' and target '${rule.target}' is ok`, reason_code: response_code, channel: channel , toBeUpdate:byOriginResponses });

                      }
                      if (response_code >= 300 && response_code < 400) {
                        e.sender.send(channel, { ok: true, rule: rule, reason: `the rule with origin '${rule.origin}' and target '${rule.target}' is redirected`, reason_code: response_code, channel: channel });
                      }
                      else {
                        e.sender.send(channel, { ok: false, rule: rule, reason: `the target '${rule.target}' of the rule with origin '${rule.origin}' does not exist`, reason_code: response_code, channel: channel });
                      }
                    }).catch((error) => {
                      e.sender.send(channel, { ok: false, rule: rule, reason: error.message, reason_code: RC.UNKNOWN, channel: channel });
                    })
                } else {
                  // is already redirected
                  e.sender.send(channel, { ok: false, rule: rule, reason: `error with the rule (origin '${rule.origin}'): the target '${rule.target}' is already redirected (soft loop)`, reason_code: RC.SOFTLOOP, channel: channel });
                }
              })

          } else {
            // the origin already exist : update
            e.sender.send(channel, { ok: false, rule: rule,  reason: `the rule with origin '${rule.origin}' already exist`, reason_code: RC.EXISTYET, channel: channel });
          }

        })
        .catch(function (error) {
          // console.log(error);
          e.sender.send(channel, { ok: false, rule: rule, reason: error.message, reason_code: RC.UNKNOWN, channel: channel });
        });
      id++;
    }
  });


}

exports.addGetEventsCheck = addGetEventsCheck;

////////////////

function isHardLoop(rule) {
  let regex = dbAccess.REGEX_URL;
    let tUrl = rule.target.match(regex)[1]
    if(tUrl.trim() !=''){
      let rOri = (rule.origin.slice(-1) == '/')?rule.origin.slice(0,-1):rule.origin;
      let rTar = (tUrl.slice(-1) == '/')?tUrl.slice(0,-1):tUrl;

      return (rOri == rTar)
    }
    return false;
}