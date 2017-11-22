const paperData = require('../seedData/paper/paperData');

// eslint-disable-next-line func-names, no-unused-vars
exports.seed = function(knex, Promise) {
  return Promise.all([
    knex
      .table('papers')
      .truncate()
      .then(() => knex.table('papers').insert(paperData)),
  ]);
};
