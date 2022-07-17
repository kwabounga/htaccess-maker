const path = require("path");
const DATABASE_FILE = path.join(__dirname, "../src/data/database.db");
const knex = require("knex")({
    client: "sqlite3",
    connection: {
        filename: DATABASE_FILE,
    },
    useNullAsDefault: true,
});


// check db existance
exports.check = function() {
  return knex.schema.hasTable("rules");
};


/*              **
 *  DB CREATION  *
 **              */
const createSchema = () => {
  return createRulesTable()
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
  return knex.schema.createTable("rules", function(table) {
      table.increments("id");
      table.integer("scope_id").notNullable();
      table.integer("redirect_type_id").notNullable();
      table.string("origin").notNullable();
      table.string("target").notNullable();
      table.boolean("active").defaultTo(true).notNullable();
      table.datetime('added_at').defaultTo(knex.fn.now())
  });
};
const createSpecialsRulesTable = () => {
  return knex.schema.createTable("specials_rules", function(table) {
      table.increments("id");
      table.integer("scope_id").notNullable();
      table.string("label").notNullable();
      table.string("regex").notNullable();
      table.string("target").notNullable();
      table.boolean("active").defaultTo(true).notNullable();
      table.datetime('added_at').defaultTo(knex.fn.now())
  });
};

const createScopesTable = () => {
  return knex.schema.createTable("scopes", function(table) {
      table.increments("id");
      table.string("label").notNullable();
  });
};
const createScopesConfigTable = () => {
  return knex.schema.createTable("scopes_config", function(table) {
      table.increments("id");
      table.integer("scope_id").notNullable();
      table.string("label").notNullable();
      table.text("config").notNullable();
      table.string("condition").notNullable();
      table.tinyint('position').defaultTo(0);
  });
};


const createHeaderConfigTable = () => {
  return knex.schema.createTable("header_config", function(table) {
      table.increments("id");
      table.string("label").notNullable();
      table.text("config").notNullable();
      table.tinyint('position').defaultTo(0);
      table.datetime('added_at').defaultTo(knex.fn.now())
  });
};

const createFooterConfigTable = () => {
  return knex.schema.createTable("footer_config", function(table) {
      table.increments("id");
      table.string("label").notNullable();
      table.text("config").notNullable();
      table.tinyint('position').defaultTo(0);
      table.datetime('added_at').defaultTo(knex.fn.now())
  });
};


/*             **
 *  DB ACCESS  *
 **            */


const insertScopes = (scopes) => {
  return knex
      .transaction(function(trx) {
          return trx("scopes").insert(scopes);
      })
      .then(function(inserts) {
          console.log(inserts.length + " new scopes saved.");
      })
      .catch(function(error) {
          console.error(error);
      });
};


/** Exports */

exports.DATABASE_FILE = DATABASE_FILE;

exports.createSchema = createSchema;
exports.insertScopes = insertScopes;
