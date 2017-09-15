const activities = require('../seedData/activitiesData');

// eslint-disable-next-line func-names, no-unused-vars
exports.seed = function(knex, Promise) {
  return knex
    .table('activities')
    .truncate()
    .then(() => knex.table('activities').insert(activities));
};
