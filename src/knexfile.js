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
      host: '35.189.142.87',
      user: 'postgres',
      password: 'sunway123',
      database: 'cem',
    },
  },
};
