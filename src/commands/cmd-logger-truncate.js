const logger = require('../electron/logger');

logger.truncate(()=>{
  console.log('ok log truncated! ');
  process.exit(0);
});
