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
  return knex(DATABASE_TABLE_RULES)
  .where('id', rule.id)
  .update(rule)

}
const updateRules = (rules)=>{
  console.log('updateRules',rules)
  // build values on the fly from the Scopes positions in the Scope[]
  let values = '';
  rules.forEach((r,idx)=>{
    values += `("${r.origin.trim()}", ${r.scope_id}, ${r.redirect_type_id}, "${r.target}", ${r.active?1:0}),`
  });
  // add the values without the last ',' ( value.slice(0,-1)) or sqlite crash
  // set the news positions
  let raw = `WITH updated(origin, scope_id, redirect_type_id, target, active) AS (VALUES
    ${values.slice(0,-1)}
)
UPDATE ${DATABASE_TABLE_RULES}
    SET
    scope_id = updated.scope_id,
    redirect_type_id = updated.redirect_type_id,
    target = updated.target,
    active = updated.active
FROM updated
WHERE (${DATABASE_TABLE_RULES}.origin = updated.origin);`

  return knex.raw(raw)
  .then(function(resp) {
    console.log(resp)
  });

}
// update scope here
const updateScope = (scope)=>{
  console.log('updateScope', scope);
  return knex(DATABASE_TABLE_SCOPES)
  .where('id', scope.id)
  .update({
    label: scope.label,
    logo_svg: scope.logo_svg,
    magento_scope_id: scope.magento_scope_id
  })

}
// update updateScopeConfig here
const updateScopeConfig = (scopeConfig)=>{
  console.log('updateScopeConfig', scopeConfig);
  return knex(DATABASE_TABLE_SCOPES_CONFIG)
  .where('id', scopeConfig.id)
  .update({
    condition: scopeConfig.condition,
    label: scopeConfig.label,
    config: scopeConfig.config,
  })

}
const updateHeaderConfig = (config)=>{
  console.log('updateHeaderConfig', config);
  return knex(DATABASE_TABLE_HEADER_CONFIG)
  .where('id', 1)
  .update({
    config: config,
  })

}
const updateFooterConfig = (config)=>{
  console.log('updateFooterConfig', config);
  return knex(DATABASE_TABLE_FOOTER_CONFIG)
  .where('id', 1)
  .update({
    config: config,
  })

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
exports.updateHeaderConfig = updateHeaderConfig;
exports.updateFooterConfig = updateFooterConfig;
exports.updateRulesPositions = updateRulesPositions;
exports.updateScopesPositions = updateScopesPositions;
exports.updateRule = updateRule;
exports.updateRules = updateRules;
exports.updateScope = updateScope;
exports.updateScopeConfig = updateScopeConfig;
