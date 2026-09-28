const Database = require("better-sqlite3");
const path = require("path");
require("dotenv").config();

const databasePath = path.resolve(
  __dirname,
  "../../",
  process.env.DATABASE_PATH
);

const db = new Database(databasePath);

db.pragma("foreign_keys = ON");

module.exports = db;