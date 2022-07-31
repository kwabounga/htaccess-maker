const path = require("path");

// get the database real path
const DATABASE_FILE = path.join(__dirname, "../data/database.db");

// database tables names
const DATABASE_TABLE_RULES = "rules";
const DATABASE_TABLE_SPECIALS_RULES = "specials_rules";
const DATABASE_TABLE_SCOPES = "scopes";
const DATABASE_TABLE_SCOPES_CONFIG = "scopes_config";
const DATABASE_TABLE_HEADER_CONFIG = "header_config";
const DATABASE_TABLE_FOOTER_CONFIG = "footer_config";
const DATABASE_TABLE_REDIRECT_TYPES = "redirect_types";

// database access
const knex = require("knex")({
    client: "sqlite3",
    connection: {
        filename: DATABASE_FILE,
    },
    useNullAsDefault: true,
});

/* Exports */
exports.knex = knex
exports.DATABASE_FILE = DATABASE_FILE;
exports.DATABASE_TABLE_SCOPES = DATABASE_TABLE_SCOPES;
exports.DATABASE_TABLE_SCOPES_CONFIG = DATABASE_TABLE_SCOPES_CONFIG;
exports.DATABASE_TABLE_HEADER_CONFIG = DATABASE_TABLE_HEADER_CONFIG;
exports.DATABASE_TABLE_FOOTER_CONFIG = DATABASE_TABLE_FOOTER_CONFIG;
exports.DATABASE_TABLE_RULES = DATABASE_TABLE_RULES;
exports.DATABASE_TABLE_SPECIALS_RULES = DATABASE_TABLE_SPECIALS_RULES;
exports.DATABASE_TABLE_REDIRECT_TYPES = DATABASE_TABLE_REDIRECT_TYPES;
