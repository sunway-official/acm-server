// Specify .env file path for Knex-cli to load the config
// to be able to run migrations and seedings
require('dotenv').config({ path: '../.env' });

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.PG_HOST,
      port: process.env.PG_PORT,
      user: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
    },
  },
  staged: {
    client: 'pg',
    connection: `pg://${process.env.PG_USER}:${process.env
      .PG_PASSWORD}@${process.env.PG_IP_ADDRESS}/${process.env
      .PG_DATABASE}?host=/cloudsql/${process.env.PG_INSTANCE_NAME}`,
  },
  production: {
    client: 'pg',
    connection: {
      host: `/cloudsql/${process.env.PG_INSTANCE_NAME}`,
      user: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
    },
  },
};
