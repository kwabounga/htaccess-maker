// get info and common knex methods from db_factory
const {
  knex,
  DATABASE_FILE,
  DATABASE_TABLE_RULES,
  DATABASE_TABLE_LOCKED_RULES,
  DATABASE_TABLE_SPECIALS_RULES,
  DATABASE_TABLE_SCOPES,
  DATABASE_TABLE_SCOPES_CONFIG,
  DATABASE_TABLE_HEADER_CONFIG,
  DATABASE_TABLE_REDIRECT_TYPES,
  DATABASE_TABLE_HISTORY,
}  = require('./bd_factory');

// get all inserts methods from CRUD insert
const {
  insertRules,
  insertLockedRules,
  insertSpecialsRules,
  insertScopes,
  insertScopesConfig,
  insertHeaders,
  insertFooters,
  insertRedirectTypes,
  makeHistory,
}  = require('./crud/insert');

// get all creates methods from CRUD create
const {
  createSchema,
  createRulesTable,
  createLockedRulesTable,
  createSpecialsRulesTable,
  createScopesTable,
  createScopesConfigTable,
  createHeaderConfigTable,
  createFooterConfigTable,
  createRedirectTypesTable,
}  = require('./crud/create');

// get all selects methods from CRUD read
const {
  getHeaderConfig,
  getFooterConfig,
  getScopesConfig,
  getRedirectTypesAll,
  getRedirectTypesByID,
  getScopesAll,
  getScopesByID,
  getScopeByMagentoID,
  getScopeConfigByScopeID,
  getRulesAll,
  getRulesByScopeId,
  getRulesByOrigin,
  checkIfRuleAlreadyExist,
  getHistory,
  verifyRedirectionLoop,
  getLockedRulesByScopeID,
  REGEX_URL,
}  = require('./crud/read');

// get all updates methods from CRUD Update
const {
  updateHeaderConfig,
  updateFooterConfig,
  updateRulesPositions,
  updateScopesPositions,
  updateRule,
  updateRules,
  updateScope,
  updateScopeConfig,
}  = require('./crud/update');

// get all deletes methods from CRUD Delete
const {
  deleteRule,
  deleteScope,
}  = require('./crud/delete');


// get all deletes methods from BAtch processing
const {
  batchRulesComment,
}  = require('./crud/batch');


// check db existance
exports.check = function() {
  return knex.schema.hasTable(DATABASE_TABLE_RULES);
};

/**
 * close db
 */
const close = () => {
  try {
    knex.destroy()
  } catch (e) {
    console.error(e.message)
  }
}

/** Exports */

// expose all methods to the electron side

// close
exports.close = close;
exports.DATABASE_FILE = DATABASE_FILE;
// creates
exports.createSchema = createSchema;

//inserts
exports.insertRules = insertRules;
exports.insertLockedRules = insertLockedRules;
exports.insertSpecialsRules = insertSpecialsRules;
exports.insertScopes = insertScopes;
exports.insertScopesConfig = insertScopesConfig;
exports.insertHeaders = insertHeaders;
exports.insertFooters = insertFooters;
exports.insertRedirectTypes = insertRedirectTypes;
exports.makeHistory = makeHistory;


// select / read
exports.getFooterConfig = getFooterConfig;
exports.getHeaderConfig = getHeaderConfig;
exports.getScopesConfig = getScopesConfig;
exports.getRedirectTypesAll = getRedirectTypesAll;
exports.getRedirectTypesByID = getRedirectTypesByID;
exports.getScopesAll = getScopesAll;
exports.getScopesByID = getScopesByID;
exports.getScopeByMagentoID = getScopeByMagentoID;
exports.getRulesAll = getRulesAll;
exports.getRulesByScopeId = getRulesByScopeId;
exports.getRulesByOrigin = getRulesByOrigin;
exports.getScopeConfigByScopeID = getScopeConfigByScopeID;
exports.getHistory = getHistory;
exports.getLockedRulesByScopeID = getLockedRulesByScopeID;

// verification
exports.checkIfRuleAlreadyExist = checkIfRuleAlreadyExist;
exports.verifyRedirectionLoop = verifyRedirectionLoop;
exports.REGEX_URL = REGEX_URL;

// updates
exports.updateHeaderConfig = updateHeaderConfig;
exports.updateFooterConfig = updateFooterConfig;
exports.updateRulesPositions = updateRulesPositions;
exports.updateScopesPositions = updateScopesPositions;
exports.updateRule = updateRule;
exports.updateRules = updateRules;
exports.updateScope = updateScope;
exports.updateScopeConfig = updateScopeConfig;

// deletes
exports.deleteRule = deleteRule;
exports.deleteScope = deleteScope;

// batch processing
exports.batchRulesComment = batchRulesComment;



exports.createLockedRulesTable = createLockedRulesTable;

