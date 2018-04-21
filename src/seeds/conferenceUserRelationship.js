const conferenceUserRelationship = require('../seedData/conference/conferenceUserRelationship');

// eslint-disable-next-line func-names, no-unused-vars
exports.seed = function(knex, Promise) {
  return knex
    .table('user_relationships_in_conferences')
    .truncate()
    .then(() =>
      knex
        .table('user_relationships_in_conferences')
        .insert(conferenceUserRelationship),
    );
};
