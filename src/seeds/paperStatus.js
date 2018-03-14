const paperStatusData = require('../seedData/paper/paperStatusData');

// eslint-disable-next-line func-names, no-unused-vars
exports.seed = function(knex, Promise) {
  return knex
    .table('paper_status')
    .truncate()
    .then(() => knex.table('paper_status').insert(paperStatusData));
};
