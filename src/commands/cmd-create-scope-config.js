
console.log(process.argv);
const scopeID = +process.argv[2]
if(!scopeID){
  console.log('no scopeID provided');
  process.exit(1);
}

const dbAccess = require("../electron/dbAccess");

console.log(scopeID);
dbAccess.insertScopesConfig({
  scope_id: scopeID,
  label: "",
  config: `
RewriteCond %{HTTP_HOST} ^placeHolder$ [NC]
RewriteRule ^(.*)$ https://www.placeHolder.com/$1 [R=301,L]
  `,
  condition: "www.placeHolder.com",
}).then((result)=>{
  console.log(scopeID,'config created',result);
  process.exit(0);
})
