const addresses = require('../seedData/conference/addressesData');

// eslint-disable-next-line func-names, no-unused-vars
exports.seed = function(knex, Promise) {
  return knex
    .table('addresses')
    .truncate()
    .then(() => knex.table('addresses').insert(addresses));
};
