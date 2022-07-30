
const fetch = require("node-fetch");
const testResponse = (target) => {
  target = target.replace(/\.com$/,'.com/');
  return fetch(target)
    .then((response) => {
      console.log(response.status);
      return response.status;
  }); 
}
/** Exports */

exports.testResponse = testResponse;
