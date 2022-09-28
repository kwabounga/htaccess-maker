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
      .then((_) => createHistoryTable())
      .then((_) => {
          console.log("schema created");
      });
};
const createRulesTable = () => {
  return knex.schema.createTable(DATABASE_TABLE_RULES, function(table) {
      table.increments("id").primary();
      table.integer("scope_id").notNullable();
      table.integer("redirect_type_id").notNullable();
      table.integer("position").defaultTo(999);
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
      table.tinyint('position').defaultTo(0);
      table.text('logo_svg');
  });
};
const createRedirectTypesTable = () => {
  return knex.schema.createTable(DATABASE_TABLE_REDIRECT_TYPES, function(table) {
      table.increments("id").primary();
      table.string("label").notNullable();
      table.string("value").notNullable();
      table.string("code").notNullable();
  });
};
const createScopesConfigTable = () => {
  return knex.schema.createTable(DATABASE_TABLE_SCOPES_CONFIG, function(table) {
      table.increments("id").primary();
      table.integer("scope_id").notNullable();
      table.string("label").notNullable();
      table.text("config").notNullable();
      table.string("condition").notNullable();
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

const createHistoryTable = () => {
  return knex.schema.createTable(DATABASE_TABLE_HISTORY, function(table) {
      table.increments("id").primary();
      table.string("label");
      table.string("guid").notNullable();
      table.string("version").notNullable();
      table.datetime('added_at').defaultTo(knex.fn.now())
  });
};

/* Exports */
exports.createSchema = createSchema;
exports.createRulesTable = createRulesTable;
exports.createSpecialsRulesTable = createSpecialsRulesTable;
exports.createScopesTable = createScopesTable;
exports.createScopesConfigTable = createScopesConfigTable;
exports.createHeaderConfigTable = createHeaderConfigTable;
exports.createFooterConfigTable = createFooterConfigTable;
exports.createRedirectTypesTable = createRedirectTypesTable;
exports.createHistoryTable = createHistoryTable;
