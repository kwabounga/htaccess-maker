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

/**
 * Update all rules positions
 * Use RAW Sqlite Query; and masse update using temporary table 'updated'
 * Used for one scope each time
 * 
 * @param {Rule[]} rules_wrapper 
 * @returns {Promise<void>}
 */
const updateRulesPositions = (rules_wrapper)=>{
  // build values on the fly from the Rules positions in the Rule[]
  let values = '';
  rules_wrapper.forEach((r,idx)=>{
    values += `(${r.id}, ${idx}),`
  });
  // add the values without the last ',' ( value.slice(0,-1)) or sqlite crash
  // set the news positions
  let raw = `WITH updated(id, position) AS (VALUES
    ${values.slice(0,-1)}
)
UPDATE ${DATABASE_TABLE_RULES}
    SET 
    position = updated.position
FROM updated
WHERE (${DATABASE_TABLE_RULES}.id = updated.id);`

  return knex.raw(raw)
  .then(function(resp) { 
    console.log(resp)
  });
}
const updateRule = (rule)=>{
  console.log('updateRule', rule);
}
const updateScopesPositions = (scopes_wrapper)=>{
  console.log('updateScopesPositions')
  // build values on the fly from the Scopes positions in the Scope[]
  let values = '';
  scopes_wrapper.forEach((r,idx)=>{
    values += `(${r.id}, ${idx}),`
  });
  // add the values without the last ',' ( value.slice(0,-1)) or sqlite crash
  // set the news positions
  let raw = `WITH updated(id, position) AS (VALUES
    ${values.slice(0,-1)}
)
UPDATE ${DATABASE_TABLE_SCOPES}
    SET 
    position = updated.position
FROM updated
WHERE (${DATABASE_TABLE_SCOPES}.id = updated.id);`

  return knex.raw(raw)
  .then(function(resp) { 
    console.log(resp)
  });
}

/* Exports */
exports.updateRulesPositions = updateRulesPositions;
exports.updateScopesPositions = updateScopesPositions;
exports.updateRule = updateRule;