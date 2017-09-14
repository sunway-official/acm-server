const activityTypes = require('../seedData/activityTypesData');

// eslint-disable-next-line func-names, no-unused-vars
exports.seed = function(knex, Promise) {
  return knex
    .table('activity_types')
    .truncate()
    .then(() => knex.table('activity_types').insert(activityTypes));
};
