// get info and common knex methods from db_factory
const { 
  knex,
  DATABASE_FILE,
  DATABASE_TABLE_RULES,
  DATABASE_TABLE_SPECIALS_RULES,
  DATABASE_TABLE_SCOPES,
  DATABASE_TABLE_SCOPES_CONFIG,
  DATABASE_TABLE_HEADER_CONFIG,
  DATABASE_TABLE_REDIRECT_TYPES,
}  = require('./bd_factory');

// get all inserts methods from CRUD insert
const { 
  insertRules,
  insertSpecialsRules,
  insertScopes,
  insertScopesConfig,
  insertHeaders,
  insertFooters,
  insertRedirectTypes,
}  = require('./crud/insert');

// get all creates methods from CRUD create
const { 
  createSchema,
  createRulesTable,
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
  getRulesByScopeId,
  checkIfRuleAlreadyExist,
}  = require('./crud/read');

// get all updates methods from CRUD Update
const { 
  updateRulesPositions,
  updateScopesPositions,
  updateRule,
}  = require('./crud/update');

// get all deletes methods from CRUD Delete
const {
  deleteRule,
}  = require('./crud/delete');


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
exports.insertSpecialsRules = insertSpecialsRules;
exports.insertScopes = insertScopes;
exports.insertScopesConfig = insertScopesConfig;
exports.insertHeaders = insertHeaders;
exports.insertFooters = insertFooters;
exports.insertRedirectTypes = insertRedirectTypes;


// select / read
exports.getFooterConfig = getFooterConfig;
exports.getHeaderConfig = getHeaderConfig;
exports.getScopesConfig = getScopesConfig;
exports.getRedirectTypesAll = getRedirectTypesAll;
exports.getRedirectTypesByID = getRedirectTypesByID;
exports.getScopesAll = getScopesAll;
exports.getScopesByID = getScopesByID;
exports.getScopeByMagentoID = getScopeByMagentoID;
exports.getRulesByScopeId = getRulesByScopeId;
exports.getScopeConfigByScopeID = getScopeConfigByScopeID;

// verification
exports.checkIfRuleAlreadyExist = checkIfRuleAlreadyExist;

// updates
exports.updateRulesPositions = updateRulesPositions;
exports.updateScopesPositions = updateScopesPositions;
exports.updateRule = updateRule;

// deletes
exports.deleteRule = deleteRule;
