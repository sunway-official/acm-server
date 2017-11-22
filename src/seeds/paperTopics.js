const paperTopicsData = require('../seedData/paper/paperTopicsData');

// eslint-disable-next-line func-names, no-unused-vars
exports.seed = function(knex, Promise) {
  return knex
    .table('papers_topics')
    .truncate()
    .then(() => knex.table('papers_topics').insert(paperTopicsData));
};
