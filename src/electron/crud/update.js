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

/*                   **
 *  DB ACCESS UPDATE *
 **                   */

const updateRulesPositions = (rules_wrapper)=>{
  let values = '';
  rules_wrapper.forEach((r,idx)=>{
    values += `(${r.id}, ${idx}),`
  });
  let raw = `WITH updated(id, position) AS (VALUES
    ${DATABASE_TABLE_RULES}
)
UPDATE ${values}
    SET 
    position = updated.position
FROM updated
WHERE (${DATABASE_TABLE_RULES}.id = updated.id);`

  return knex.raw(raw)
  .then(function(resp) { 
    console.log(resp)
  });
}

exports.updateRulesPositions = updateRulesPositions;