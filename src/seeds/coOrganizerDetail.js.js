const coOrganizerDetail = require('../seedData/conference/coOrganizerDetailData');

// eslint-disable-next-line func-names, no-unused-vars
exports.seed = function(knex, Promise) {
  return knex
    .table('coOrganizer_detail')
    .truncate()
    .then(() => knex.table('coOrganizer_detail').insert(coOrganizerDetail));
};
