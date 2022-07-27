const dbAccess = require("./dbAccess");
const addEvents = (ipcMain) => {
  ipcMain.on("check:rules", (e, rules) => {
    console.log("check", rules);
    for (const rule of rules) {
      dbAccess
        .checkIfRuleAlreadyExist(rule)
        .then(function (count) {
          e.sender.send("rule:checked", { ok: count <= 0, rule: rule });
        })
        .catch(function (error) {
          console.log(error);
          e.sender.send("rule:checked", false);
        });
    }
  });
};
exports.addEvents = addEvents;
