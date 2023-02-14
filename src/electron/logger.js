const fs = require('fs');
const path = require('path');
const theLogPath = path.join(__dirname,'../../log/log.log');
const tools = require("./tools");

const log = (output, ...args) => {
  let o = `${tools.date()} ${output} ${args.join(' ')}\n`;
    fs.appendFile(theLogPath, o, 'utf8', (err) => {
        if(err) console.error(err);
    });
}

const truncate = (callback) => {
    fs.truncate(theLogPath, 0, callback);
}


/** Exports */
exports.log = log;
exports.truncate = truncate;
