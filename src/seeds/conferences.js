const conferences = require('../seedData/conferencesData');

// eslint-disable-next-line func-names, no-unused-vars
exports.seed = function(knex, Promise) {
  return knex
    .table('conferences')
    .truncate()
    .then(() => knex.table('conferences').insert(conferences));
};
