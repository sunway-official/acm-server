const colors = require('../seedData/topic/colorsData');

// eslint-disable-next-line func-names, no-unused-vars
exports.seed = function(knex, Promise) {
  return Promise.all([
    knex
      .table('colors')
      .truncate()
      .then(() => knex.table('colors').insert(colors)),
  ]);
};
