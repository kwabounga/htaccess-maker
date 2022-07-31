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

const { 
  insertRules,
  insertSpecialsRules,
  insertScopes,
  insertScopesConfig,
  insertHeaders,
  insertFooters,
  insertRedirectTypes,
}  = require('./crud/insert');

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

const { 
  updateRulesPositions,
}  = require('./crud/update');

// check db existance
exports.check = function() {
  return knex.schema.hasTable(DATABASE_TABLE_RULES);
};

const close = () => {
  try {
    knex.destroy()
  } catch (e) {
    console.error(e.message)
  }
}

/** Exports */


exports.close = close;
exports.DATABASE_FILE = DATABASE_FILE;
exports.createSchema = createSchema;

exports.insertRules = insertRules;
exports.insertSpecialsRules = insertSpecialsRules;
exports.insertScopes = insertScopes;
exports.insertScopesConfig = insertScopesConfig;
exports.insertHeaders = insertHeaders;
exports.insertFooters = insertFooters;
exports.insertRedirectTypes = insertRedirectTypes;

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
exports.checkIfRuleAlreadyExist = checkIfRuleAlreadyExist;


exports.updateRulesPositions = updateRulesPositions;
