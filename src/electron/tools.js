/**
 * a simple wait/sleep function
 * @param {number} time
 * @returns {Promise<void>}
 */
async function wait(time = 1000) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

/**
 * generate guid
 * @returns {string}
 */
function guid() {
  let rand = function () {
    return Math.floor(Math.random() * 1250);
  }
  let now = Date.now();
  return `${rand()}${now}`;
}

/**
 * generate date
 * @returns {string}
 */
function date() {
  let d = new Date();
  return `${d.getDate().toString().padStart(2,'0')}-${(d.getMonth() + 1 ).toString().padStart(2,'0')}-${d.getFullYear()}`;
}




/* Export */
exports.wait = wait;
exports.guid = guid;
exports.date = date;
