const organizerDetails = require('../seedData/conference/organizerDetailsData');

// eslint-disable-next-line func-names, no-unused-vars
exports.seed = function(knex, Promise) {
  return knex
    .table('organizer_detail')
    .truncate()
    .then(() => knex.table('organizer_detail').insert(organizerDetails));
};
