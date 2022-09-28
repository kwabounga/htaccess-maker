const fs = require('fs');
const path = require('path');
const DB_PATH = '../data/database.db';
const DB_HISTORY_PATH = '../data/backup/';
const pjson = require('./../package.json');
const tools = require('./tools')
const backup = (label) => {
  const version = pjson.version;
  const guid = tools.guid();
  const date = tools.date();

  return new Promise (async (resolve, reject)=>{
    let filename = `${guid}.db`;
    const dest = path.join(__dirname, DB_HISTORY_PATH, filename);
    const orig = path.join(__dirname, DB_PATH);
    /* create folder  */
    try {
      fs.mkdirSync(path.join(__dirname, DB_HISTORY_PATH));
    } catch (error) {
      if(error.code !== 'EEXIST'){
        reject(error);
      }
      console.log('dir already exist ', error.code);
    }

    /* create backup  */
    try {
      fs.copyFileSync(orig, dest)
    } catch (error) {
      reject(error);
    }

    console.log('file created in ', dest);
    resolve({
      label,
      filename,
      guid,
      date,
      version
    });
  }).then((finfo)=>{
    console.log(`ok: file ${finfo.filename} created ${finfo.date}`)
    return finfo
  }).catch((e)=>{
    console.error(`something went wrong while creating the ${fname} file backup`)
    console.error(e.message)
  })

}


exports.backup = backup;
