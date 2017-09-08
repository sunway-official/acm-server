const users = require('../seedData/userData');

// eslint-disable-next-line func-names, no-unused-vars
exports.seed = function(knex, Promise) {
  return Promise.all([
    knex
      .table('users')
      .truncate()
      .then(() => knex.table('users').insert(users)),
  ]);
};
