const activityTopics = require('../seedData/activityTopicsData');

// eslint-disable-next-line func-names, no-unused-vars
exports.seed = function(knex, Promise) {
  return knex
    .table('activity_topics')
    .truncate()
    .then(() => knex.table('activity_topics').insert(activityTopics));
};
