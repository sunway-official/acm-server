const activityFeedback = require('../seedData/activityFeedbackData');

// eslint-disable-next-line func-names, no-unused-vars
exports.seed = function(knex, Promise) {
  return knex
    .table('activity_feedback')
    .truncate()
    .then(() => knex.table('activity_feedback').insert(activityFeedback));
};
