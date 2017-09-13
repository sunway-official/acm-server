// const conferencesAttendees = require('../seedData/conferencesAttendeesData');
const conferencesAttendees = [];

// eslint-disable-next-line func-names, no-unused-vars
exports.seed = function(knex, Promise) {
  return knex
    .table('conferences_attendees')
    .truncate()
    .then(() =>
      knex.table('conferences_attendees').insert(conferencesAttendees),
    );
};
