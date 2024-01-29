const {
  knex,
  DATABASE_TABLE_RULES,
  DATABASE_TABLE_SPECIALS_RULES,
  DATABASE_TABLE_LOCKED_RULES,
  DATABASE_TABLE_SCOPES,
  DATABASE_TABLE_SCOPES_CONFIG,
  DATABASE_TABLE_HEADER_CONFIG,
  DATABASE_TABLE_FOOTER_CONFIG,
  DATABASE_TABLE_REDIRECT_TYPES,
} = require('../bd_factory');
const {
  notLockedRulesIDSfilter,
} = require('./read');
/*                            **
 *  DB ACCESS BATCH PROCESSING *
 **                            */

/**
 *  comment / uncomment rules by ids
 */
const batchRulesComment = async (rulesIds, uncomment = false, scope_id)=>{
  // ici faire tri  + ajouter la notion de scope_id en parametre
  let notLockedIds = notLockedRulesIDSfilter(rulesIds, scope_id)
  console.log('batchRulesComment'+(uncomment?' (uncomment)':''))
  // build values on the fly from the Rules ids
  let values = '';
  rulesIds.forEach((id)=>{
    values += `(${id}, ${+uncomment}),`
  });
  // add the values without the last ',' ( value.slice(0,-1)) or sqlite crash
  // set the news positions
  let raw = `WITH updated(id, active) AS (VALUES
    ${values.slice(0,-1)}
)
UPDATE ${DATABASE_TABLE_RULES}
    SET
    active = updated.active
FROM updated
WHERE (${DATABASE_TABLE_RULES}.id = updated.id);`

  return knex.raw(raw)
  .then(function(resp) {
    // console.log(resp)
    return resp;
  });
}

/* Exports */
exports.batchRulesComment = batchRulesComment;
