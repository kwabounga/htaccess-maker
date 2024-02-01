const {
  knex,
  DATABASE_TABLE_RULES,
  DATABASE_TABLE_SPECIALS_RULES,
  DATABASE_TABLE_SCOPES,
  DATABASE_TABLE_SCOPES_CONFIG,
  DATABASE_TABLE_HEADER_CONFIG,
  DATABASE_TABLE_FOOTER_CONFIG,
  DATABASE_TABLE_REDIRECT_TYPES,
  DATABASE_TABLE_LOCKED_RULES,
} = require('../bd_factory');

/*                   **
 *  DB ACCESS Delete *
 **                   */


const deleteRule = (rule)=>{
  console.log('deleteRule', rule);
  return knex(DATABASE_TABLE_RULES)
  .where('id', rule.id)
  .del()

}

const deleteScope = (scope_id) => {
  console.log("deleteScope", scope_id);
  return knex(DATABASE_TABLE_RULES)
    .where("scope_id", scope_id)
    .del()
    .then(() => {
      return knex(DATABASE_TABLE_SCOPES_CONFIG)
        .where("scope_id", scope_id)
        .del()
        .then(() => {
          return knex(DATABASE_TABLE_SCOPES).where("id", scope_id).del();
        });
    });
};

/**
 *
 * @param {number} locked_rule_id
 * @returns {Promise}
 */
const deleteLockedRuleById = (locked_rule_id)=>{
  console.log('deleteRulebyID', locked_rule_id);
  return knex(DATABASE_TABLE_LOCKED_RULES)
  .where("id", locked_rule_id)
  .del()
}
/**
 *
 * @param {number} scope_id
 * @returns {Promise}
 */
const deleteLockedRules = (scope_id)=>{
  console.log('deleteLockedRules', scope_id);
  return knex(DATABASE_TABLE_LOCKED_RULES)
  .where("scope_id", scope_id)
  .del()
}
/* Exports */
exports.deleteRule = deleteRule;
exports.deleteScope = deleteScope;
exports.deleteLockedRules = deleteLockedRules;
exports.deleteLockedRuleById = deleteLockedRuleById;
