const paperAuthorData = require('../seedData/paper/paperAuthorData');

// eslint-disable-next-line func-names, no-unused-vars
exports.seed = function(knex, Promise) {
  return Promise.all([
    knex
      .table('papers_authors')
      .truncate()
      .then(() => knex.table('papers_authors').insert(paperAuthorData)),
  ]);
};
