const {
  knex,
  DATABASE_TABLE_RULES,
  DATABASE_TABLE_SPECIALS_RULES,
  DATABASE_TABLE_SCOPES,
  DATABASE_TABLE_SCOPES_CONFIG,
  DATABASE_TABLE_HEADER_CONFIG,
  DATABASE_TABLE_FOOTER_CONFIG,
  DATABASE_TABLE_REDIRECT_TYPES,
  DATABASE_TABLE_HISTORY,
} = require('../bd_factory');

const REGEX_URL =  /https?:\/\/\w+\.[\w_-]+\.\w{2,3}(\S*)/;

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
  }).select().orderBy([
    { column: 'position' },
    { column: 'origin', order: 'desc' }
  ]);
}
const getRulesAll = () => {
  return knex(DATABASE_TABLE_RULES).select();
}
// Rules
const getRulesByOrigin = (origin) => {
  let regex = /https:\/\/.*\.com/;
  // console.log('getRulesByOrigin using origin', '%'+origin.replace(regex,''))
  return knex(DATABASE_TABLE_RULES).whereLike(
    'target', '%'+origin.replace(regex,''),
  ).select().orderBy([
    { column: 'position' },
    { column: 'origin', order: 'desc' }
  ]);
}
const getLockedRulesByScopeID = (scope_id) => {
  let regex = /https:\/\/.*\.com/;
  let ori = target.replace(regex,'').trim()

  /* if( ori !== '' && ori !== '/' ){
    console.log('Locked Rules (ori):', ori)
  } */
  return knex(DATABASE_TABLE_LOCKED_RULES).where({
    scope_id: scope_id
  }).select().orderBy([
    { column: 'position' },
    { column: 'origin', order: 'desc' }
  ]);
}
const getRulesByTarget = (target) => {
  let regex = /https:\/\/.*\.com/;
  // console.log('getRulesByTarget using target',target.replace(regex,''))
  return knex(DATABASE_TABLE_RULES).where({
    origin: target.replace(regex,''),
  }).select().orderBy([
    { column: 'position' },
    { column: 'origin', order: 'desc' }
  ]);
}
const checkIfRuleAlreadyExist = (rule) => {
  return knex(DATABASE_TABLE_RULES)
      .where({ scope_id: rule.scope_id })
      .where({ origin: rule.origin });
      //.then(rows => rows.length);
}



const verifyRedirectionLoop = (rule) => {
  let regex = REGEX_URL;
  let targetWithoutBase = rule.target.match(regex)[1];
  // console.log('verifyRedirectionLoop', targetWithoutBase)
  return knex(DATABASE_TABLE_RULES)
      .where({ scope_id: rule.scope_id })
      .where({ origin: targetWithoutBase })
      .then(rows => rows.length);
}

const getHistory = () => {
  return knex(DATABASE_TABLE_HISTORY).select();
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
exports.getRulesAll = getRulesAll;
exports.getLockedRulesByScopeID = getLockedRulesByScopeID;
exports.getRulesByScopeId = getRulesByScopeId;
exports.getRulesByOrigin = getRulesByOrigin;
exports.getScopeConfigByScopeID = getScopeConfigByScopeID;
exports.getScopeConfigByMagentoID = getScopeConfigByMagentoID;
exports.checkIfRuleAlreadyExist = checkIfRuleAlreadyExist;
exports.verifyRedirectionLoop = verifyRedirectionLoop;
exports.getHistory = getHistory;
exports.REGEX_URL = REGEX_URL;
