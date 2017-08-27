module.exports = {
  client: 'pg',
  connection: {
    host: `/cloudsql/${process.env.PG_INSTANCE_NAME}`,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
  },
};

// postgres://sunway:sunway123@35.189.142.87:5432/cem
