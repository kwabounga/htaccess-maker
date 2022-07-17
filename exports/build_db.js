const dbAccess = require("./dbAccess");

dbAccess.check()
.then((exists)=>{
  if (!exists) {
    return dbAccess.createSchema().then((_) => {
      return populateDatabase();
    });
  }
}).then((_) => {
  console.log(`.. file ${dbAccess.DATABASE_FILE} created`);
  console.log(".. database populated");
  console.log(".. done");
  process.exit(0)
})
.catch((error) => {
  console.error('ERROR');
  console.error(error);
  console.error('.. please check sqlite3 configuration');
  console.error('.. please check your version of python (2.7)');
  console.error('.. please check your version of windows studio (2015)');
  console.error('.. see readme for rebuild sqlite3');
  console.error(`delete ${dbAccess.DATABASE_FILE}`);
  console.error('.. then');
  console.error('re-run npm run create-database');

  process.exit(1)
});

/*                **
 *  DB POPULATION  *
 **                */
const populateDatabase = () => {
  return populateScopeTable()
    /* .then((_) => populateCommandTable())
    .then((_) => populateAppInfosTable()) */
    .then((_) => {
      console.log("db populated");
    });
};

const populateScopeTable = () => {
  const scopeArray = [
    { label: "JeuJouet.com" },
    { label: "Bonhomedebois.com" },
    { label: "Moulinroty-maboutique.com" },
  ];
  return dbAccess.insertScopes(scopeArray);
};

