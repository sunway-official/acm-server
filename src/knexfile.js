module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: 'postgres',
      password: 'Abc123',
      database: 'cem-dev',
    },
  },
  production: {
    client: 'pg',
    connection: {
      host: '35.200.26.236',
      user: 'sunway.dev',
      password: 'sunway123',
      database: 'cem',
    },
  },
};
