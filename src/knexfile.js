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
  production: {
    client: 'pg',
    connection: `postgres://kdoeyycozvcevz:5d73ac8e8de388284d979a93a1be0250f82bd5fb78c0d5f175de53a389bbc623@ec2-107-20-249-48.compute-1.amazonaws.com:5432/d8f4lsn1lu6pa1`,
  },
};
