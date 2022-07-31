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

/* Export */
exports.wait = wait;