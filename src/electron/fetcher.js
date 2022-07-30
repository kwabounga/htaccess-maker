const fetch = require("node-fetch");
/**
 * 
 * @param {string} target 
 * @returns {number} the http response status
 */
const testResponse = (target) => {
  target = target.replace(/\.com$/,'.com/');
  return fetch(target)
    .then((response) => {
      console.log(response.status,response.redirected,response);
      redirected_status = (response.redirected && response.status == 200);
      return redirected_status ? 301 : response.status;
  }); 
}
/** Exports */

exports.testResponse = testResponse;
