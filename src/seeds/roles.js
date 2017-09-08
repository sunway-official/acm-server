const roles = require('../seedData/rolesData');

// eslint-disable-next-line func-names, no-unused-vars
exports.seed = function(knex, Promise) {
  return Promise.all([
    knex
      .table('roles')
      .truncate()
      .then(() => knex.table('roles').insert(roles)),
  ]);
};
