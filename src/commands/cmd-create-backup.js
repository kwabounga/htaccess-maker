
console.log(process.argv);
const label = process.argv[2]
console.log(label);
if(!label){
  console.log('no label provided');
  label = (new Date()).toISOString()
}

const dbAccess = require("../electron/dbAccess");

dbAccess.makeHistory(label).then((fname)=>{
  console.log(label,'version of history created:', fname);
  process.exit(0);
})
