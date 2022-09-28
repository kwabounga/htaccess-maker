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
const { backup } = require('../history');
/*                   **
 *  DB ACCESS INSERTS *
 **                   */
const insertRules = (rules) => {
  return knex
      .transaction(function(trx) {
          return trx(DATABASE_TABLE_RULES).insert(rules);
      })
      .then(function(inserts) {
          console.log(inserts.length + " new rules saved.");
          return inserts;
      })
      .catch(function(error) {
          console.error(error);
          return error;
      });
};

const insertRedirectTypes = (redirect_types) => {
  return knex
      .transaction(function(trx) {
          return trx(DATABASE_TABLE_REDIRECT_TYPES).insert(redirect_types);
      })
      .then(function(inserts) {
          console.log(inserts.length + " new redirect_types saved.");
          return inserts;
      })
      .catch(function(error) {
          console.error(error);
          return error;
      });
};
const insertScopes = (scopes) => {
  return knex
      .transaction(function(trx) {
          return trx(DATABASE_TABLE_SCOPES).insert(scopes);
      })
      .then(function(inserts) {
          console.log(inserts.length + " new scopes saved.");
          return inserts;
      })
      .catch(function(error) {
          console.error(error);
          return error;
      });
};
const insertScopesConfig = (scopesConfig) => {
  return knex
      .transaction(function(trx) {
          return trx(DATABASE_TABLE_SCOPES_CONFIG).insert(scopesConfig);
      })
      .then(function(inserts) {
          console.log(inserts.length + " new scopes_config saved.");
          return inserts;
      })
      .catch(function(error) {
          console.error(error);
          return error;
      });
};
const insertSpecialsRules = (speRules) => {
  return knex
      .transaction(function(trx) {
          return trx(DATABASE_TABLE_SPECIALS_RULES).insert(speRules);
      })
      .then(function(inserts) {
          console.log(inserts.length + " new special rules saved.");
          return inserts;
      })
      .catch(function(error) {
          console.error(error);
          return error;
      });
};

const insertHeaders = (headers) => {
  return knex
      .transaction(function(trx) {
          return trx(DATABASE_TABLE_HEADER_CONFIG).insert(headers);
      })
      .then(function(inserts) {
          console.log(inserts.length + " new header_config saved.");
          return inserts;
      })
      .catch(function(error) {
          console.error(error);
          return error;
      });
};
const insertFooters = (footers) => {
  return knex
  .transaction(function(trx) {
    return trx(DATABASE_TABLE_FOOTER_CONFIG).insert(footers);
  })
  .then(function(inserts) {
    console.log(inserts.length + " new header_config saved.");
    return inserts;
  })
  .catch(function(error) {
    console.error(error);
    return error
  });
};

const makeHistory = (label) => {

  return backup(label).then((finfo)=>{
    return knex
  .transaction(function(trx) {
    return trx(DATABASE_TABLE_HISTORY).insert([{label:finfo.label, guid:finfo.guid, version:finfo.version }]);
  })
  .then(function(inserts) {
    console.log(inserts.length + " new history reference saved.");
    return inserts;
  })
  .catch(function(error) {
    console.error(error);
    return error
  });
  })
  /*  */
};
/* Exports */
exports.insertRules = insertRules;
exports.insertSpecialsRules = insertSpecialsRules;
exports.insertScopes = insertScopes;
exports.insertScopesConfig = insertScopesConfig;
exports.insertHeaders = insertHeaders;
exports.insertFooters = insertFooters;
exports.insertRedirectTypes = insertRedirectTypes;
exports.makeHistory = makeHistory;
