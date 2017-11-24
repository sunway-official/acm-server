const authorData = require('../seedData/paper/authorData');

// eslint-disable-next-line func-names, no-unused-vars
exports.seed = function(knex, Promise) {
  return Promise.all([
    knex
      .table('authors')
      .truncate()
      .then(() => knex.table('authors').insert(authorData)),
  ]);
};
