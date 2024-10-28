// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "pg",
    connection: {
      user: "postgres",
      host: "127.0.0.1",
      password: "postgres",
      database: "events",
    },
  },
};
