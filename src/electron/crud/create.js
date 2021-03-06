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
 *  DB CREATE    *
 **              */
const createSchema = () => {
  return createRulesTable()
      .then((_) => createRedirectTypesTable())
      .then((_) => createScopesTable())
      .then((_) => createScopesConfigTable())
      .then((_) => createSpecialsRulesTable())
      .then((_) => createHeaderConfigTable())
      .then((_) => createFooterConfigTable())
      .then((_) => {
          console.log("schema created");
      });
};
const createRulesTable = () => {
  return knex.schema.createTable(DATABASE_TABLE_RULES, function(table) {
      table.increments("id").primary();
      table.integer("scope_id").notNullable();
      table.integer("redirect_type_id").notNullable();
      table.string("origin").notNullable();
      table.string("target").notNullable();
      table.boolean("active").defaultTo(true).notNullable();
      table.datetime('added_at').defaultTo(knex.fn.now())
  });
};
const createSpecialsRulesTable = () => {
  return knex.schema.createTable(DATABASE_TABLE_SPECIALS_RULES, function(table) {
      table.increments("id").primary();
      table.integer("scope_id").notNullable();
      table.string("label").notNullable();
      table.string("regex").notNullable();
      table.string("target").notNullable();
      table.boolean("active").defaultTo(true).notNullable();
      table.datetime('added_at').defaultTo(knex.fn.now())
  });
};
const createScopesTable = () => {
  return knex.schema.createTable(DATABASE_TABLE_SCOPES, function(table) {
      table.increments("id").primary();
      table.integer("magento_scope_id").notNullable().unique();
      table.string("label").notNullable();
  });
};
const createRedirectTypesTable = () => {
  return knex.schema.createTable(DATABASE_TABLE_REDIRECT_TYPES, function(table) {
      table.increments("id").primary();
      table.string("label").notNullable();
      table.string("value").notNullable();
  });
};
const createScopesConfigTable = () => {
  return knex.schema.createTable(DATABASE_TABLE_SCOPES_CONFIG, function(table) {
      table.increments("id").primary();
      table.integer("scope_id").notNullable();
      table.string("label").notNullable();
      table.text("config").notNullable();
      table.string("condition").notNullable();
      table.tinyint('position').defaultTo(0);
  });
};
const createHeaderConfigTable = () => {
  return knex.schema.createTable(DATABASE_TABLE_HEADER_CONFIG, function(table) {
      table.increments("id").primary();
      table.string("label").notNullable();
      table.text("config").notNullable();
      table.tinyint('position').defaultTo(0);
      table.datetime('added_at').defaultTo(knex.fn.now())
  });
};
const createFooterConfigTable = () => {
  return knex.schema.createTable(DATABASE_TABLE_FOOTER_CONFIG, function(table) {
      table.increments("id").primary();
      table.string("label").notNullable();
      table.text("config").notNullable();
      table.tinyint('position').defaultTo(0);
      table.datetime('added_at').defaultTo(knex.fn.now())
  });
};


exports.createSchema = createSchema;
exports.createRulesTable = createRulesTable;
exports.createSpecialsRulesTable = createSpecialsRulesTable;
exports.createScopesTable = createScopesTable;
exports.createScopesConfigTable = createScopesConfigTable;
exports.createHeaderConfigTable = createHeaderConfigTable;
exports.createFooterConfigTable = createFooterConfigTable;
exports.createRedirectTypesTable = createRedirectTypesTable;