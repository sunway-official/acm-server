const permissions = require('../seedData/permissionsData');
// const permissions = [];

// eslint-disable-next-line func-names, no-unused-vars
exports.seed = function(knex, Promise) {
  return Promise.all([
    knex
      .table('permissions')
      .truncate()
      .then(() => knex.table('permissions').insert(permissions)),
  ]);
};
