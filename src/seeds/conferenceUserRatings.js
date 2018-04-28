const conferenceUserRating = require('../seedData/conference/userRatingdata');

// eslint-disable-next-line func-names, no-unused-vars
exports.seed = function(knex, Promise) {
  return knex
    .table('conference_user_ratings')
    .truncate()
    .then(() =>
      knex.table('conference_user_ratings').insert(conferenceUserRating),
    );
};
