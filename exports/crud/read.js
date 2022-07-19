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

// Rules 
const getRedirectTypesAll = () => {
  return knex.select()
  .table(DATABASE_TABLE_REDIRECT_TYPES);
}

const getRedirectTypesByID = (id) => {
  return knex(DATABASE_TABLE_REDIRECT_TYPES).where({
    id: id,
  }).select();
}

// Scopes
const getScopesAll = () => {
  return knex.select()
  .table(DATABASE_TABLE_SCOPES);
}

const getScopesByID = (id) => {
  return knex(DATABASE_TABLE_SCOPES).where({
    id: id,
  }).select();
}


const getScopeConfigByScopeID = (scope_id) => {
  return knex(DATABASE_TABLE_SCOPES).where({
    scope_id: scope_id,
  }).select();
}
