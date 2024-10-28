const knex = require("knex");

function createConnection() {
  return knex({
    client: "pg",
    connection: {
      user: "postgres",
      host: "127.0.0.1",
      password: "postgres",
      database: "events",
    },
  });
}
module.exports = {createConnection}
