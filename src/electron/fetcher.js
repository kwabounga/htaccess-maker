const fetch = require("node-fetch");


/**
 * test the  http response from fetch
 * used to check the validity of redirection target url
 * 
 * @param {string} target 
 * @returns {Promise<number>} the http response status
 */
const testResponse = (target) => {
  // add a slash a the end of target url if url don't have it (without it the response is always a 404)
  target = target.replace(/\.com$/,'.com/');

  // return Promise
  return fetch(target)
    .then((response) => {
      console.log(response.status,response.redirected,response);
      redirected_status = (response.redirected && response.status == 200);
      return redirected_status ? 301 : response.status;
  }); 
}


/** Exports */
exports.testResponse = testResponse;
