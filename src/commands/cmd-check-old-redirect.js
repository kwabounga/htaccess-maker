let allRules = [];
let currentActivesUrls = [];
console.log(process.argv);
const scopeID = +process.argv[2]
if(!scopeID){
  console.log('no scopeID provided');
  process.exit(1);
}

const dbAccess = require("../electron/dbAccess");
const fs = require('fs') ;
console.log(scopeID);
allRules = dbAccess.getRulesByScopeId(scopeID).then((result)=>{
  // console.log(`rules for scope  ${scopeID}`,result);

  const ar = result.map((r)=>{
    return r.origin.split('.html')[0]
  })
  console.log(`mapped rules for scope  ${scopeID}`, ar);
  return ar;

})

currentActivesUrls = JSON.parse(fs.readFileSync('./src/tmp/export-all-25_10_2022--14_21_20.json'));
/* console.log(`currentActivesUrls for scope  ${scopeID}`, currentActivesUrls[scopeID]); */
const arrUrls = currentActivesUrls[scopeID];
let index;
const length = arrUrls.length;
for (index = 0; index < length; index++) {
  const curUrl = arrUrls[index];
  console.log('curUrl', curUrl)
  
}
/* process.exit(0); */
