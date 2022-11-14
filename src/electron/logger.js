const fs = require('fs');
const path = require('path');
const theLogPath = path.join(__dirname,'../../log/log.log');

const log = (output) => {    
    fs.appendFile(theLogPath, ('' + output), 'utf8', (err)=>{
        if(err) console.error(err);
    });
}

const truncate = (callback) => {    
    fs.truncate(theLogPath, 0, callback);
}


/** Exports */
exports.log = log;
exports.truncate = truncate;