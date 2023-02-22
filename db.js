const { Client } = require("pg");

const db = new Client({
  password: "root",
  user: "root",
  host: "postgres",
});

module.exports = db;
