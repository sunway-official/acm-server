const landingPages = require('../seedData/conference/landingPagesData');
// eslint-disable-next-line func-names, no-unused-vars
exports.seed = function(knex, Promise) {
  return Promise.all([
    knex
      .table('landing_pages')
      .truncate()
      .then(() => knex.table('landing_pages').insert(landingPages)),
  ]);
};
