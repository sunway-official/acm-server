const conferenceTopics = require('../seedData/conference/conferenceTopicsData');

// eslint-disable-next-line func-names, no-unused-vars
exports.seed = function(knex, Promise) {
  return knex
    .table('conference_topics')
    .truncate()
    .then(() => knex.table('conference_topics').insert(conferenceTopics));
};
