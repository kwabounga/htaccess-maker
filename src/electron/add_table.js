const dbAccess = require("./dbAccess");
const tools = require("./tools");
const {
  FooterConfig,
  HeaderConfig,
  RedirectType,
  Rule,
  Scope,
  ScopeConfig,
  SpecialRule,
  LockedRule,
} = require('./bo')

// check for database existance
dbAccess.check()
.then((exists)=>{
    // if don't exist, create , then populate it
  if (!exists) {
    // must be existe here : create db first
  }
  return dbAccess.createLockedRulesTable().then((_) => {
    return populateLockedRulesTable();
  }).then(_=>{
    return dbAccess.makeHistory('locked rules table  created')
  });

}).then((_) => {
  console.log(".. table added");
  console.log(".. done");
  process.exit(0)
})
.catch((error) => {
  console.error('ERROR');
  console.error(error);
  process.exit(1)
});

/*                **
 *  DB POPULATION  *
 **                */


/**
 * Populate Rules Table with Sample
 * @returns {Promise<Rule[]>}
 */
const populateLockedRulesTable = () => {
  const lockedRulesArray = [
    new LockedRule(1, "/sitemap.xml", "https://www.jeujouet.com", true),  // 1
    new LockedRule(2, "/sitemap.xml", "https://www.bonhommedebois.com", true),  // 2
    new LockedRule(3, "/sitemap.xml", "https://www.moulinroty-maboutique.com", true),  // 3
  ];
  return dbAccess.insertLockedRules(lockedRulesArray);
};
