const logger = require('../electron/logger');

logger.truncate(()=>{
  console.log('ok its truncated mother fucka');
  process.exit(0);
});
