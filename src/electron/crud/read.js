const { 
  knex,
  DATABASE_TABLE_RULES,
  DATABASE_TABLE_SPECIALS_RULES,
  DATABASE_TABLE_SCOPES,
  DATABASE_TABLE_SCOPES_CONFIG,
  DATABASE_TABLE_HEADER_CONFIG,
  DATABASE_TABLE_FOOTER_CONFIG,
  DATABASE_TABLE_REDIRECT_TYPES,
} = require('../bd_factory');


/*              **
 *  DB READ      *
 **              */

// Header  
const getHeaderConfig = () => {
  return knex(DATABASE_TABLE_HEADER_CONFIG).where({
    id: 1,
  }).select();
}
// Footer  
const getFooterConfig = () => {
  return knex(DATABASE_TABLE_FOOTER_CONFIG).where({
    id: 1,
  }).select();
}
const getScopesConfig = () => {
  return knex(DATABASE_TABLE_SCOPES_CONFIG).select();
}
// RedirectTypes 
const getRedirectTypesAll = () => {
  return knex(DATABASE_TABLE_REDIRECT_TYPES).select();
}

const getRedirectTypesByID = (id) => {
  return knex(DATABASE_TABLE_REDIRECT_TYPES).where({
    id: id,
  }).select();
}

// Scopes
const getScopesAll = () => {
  return knex(DATABASE_TABLE_SCOPES).select().orderBy('position');;
}

const getScopesByID = (id) => {
  return knex(DATABASE_TABLE_SCOPES).where({
    id: id,
  }).select();
}

const getScopeByMagentoID = (magento_scope_id) => {
  return knex(DATABASE_TABLE_SCOPES).where({
    magento_scope_id: magento_scope_id,
  }).select();
}


const getScopeConfigByScopeID = (scope_id) => {
  // console.log('getScopeConfigByScopeID scope_id',scope_id)
  return knex(DATABASE_TABLE_SCOPES_CONFIG).where({
    scope_id: scope_id,
  }).select();
}
const getScopeConfigByMagentoID = (magento_scope_id) => {
  // console.log('getScopeConfigByScopeID scope_id',scope_id)
  return knex(DATABASE_TABLE_SCOPES_CONFIG).where({
    magento_scope_id: magento_scope_id,
  }).select();
}
// Rules 
const getRulesByScopeId = (scope_id) => {
  return knex(DATABASE_TABLE_RULES).where({
    scope_id: scope_id,
  }).select().orderBy('position');
}
const checkIfRuleAlreadyExist = (rule) => {
  return knex(DATABASE_TABLE_RULES)
      .where({ scope_id: rule.scope_id })
      .where({ origin: rule.origin })
      .then(rows => rows.length);
}


/* Exports */
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
exports.getScopeConfigByMagentoID = getScopeConfigByMagentoID;
exports.checkIfRuleAlreadyExist = checkIfRuleAlreadyExist;