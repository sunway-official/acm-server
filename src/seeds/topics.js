const topics = require('../seedData/topic/topicsData');

// eslint-disable-next-line func-names, no-unused-vars
exports.seed = function(knex, Promise) {
  return knex
    .table('topics')
    .truncate()
    .then(() => knex.table('topics').insert(topics));
};
