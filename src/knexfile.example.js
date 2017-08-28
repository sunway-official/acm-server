module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      port: '5432',
      user: 'postgres',
      password: 'Abc123',
      database: 'cem-dev',
    },
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
