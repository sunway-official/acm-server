const personalSchedules = require('../seedData/personalScheduleData');

// eslint-disable-next-line func-names, no-unused-vars
exports.seed = function(knex, Promise) {
  return Promise.all([
    knex
      .table('personal_schedules')
      .truncate()
      .then(() => knex.table('personal_schedules').insert(personalSchedules)),
  ]);
};
