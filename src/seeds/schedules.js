const schedules = require('../seedData/schedule/schedulesData');

// eslint-disable-next-line func-names, no-unused-vars
exports.seed = function(knex, Promise) {
  return knex
    .table('schedules')
    .truncate()
    .then(() => knex.table('schedules').insert(schedules));
};
