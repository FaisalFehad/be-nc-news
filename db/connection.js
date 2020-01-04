const ENV = process.env.NODE_ENV || "development";
const knex = require("knex");
const dbConfig = require("../knexfile");
// const connection = knex(dbConfig);

const dbConfig =
  ENV === "production"
    ? { client: "pg", connection: process.env.DATABASE_URL }
    : require("../knexfile");

module.exports = knex(dbConfig);
