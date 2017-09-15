const answers = require('../seedData/answersData');

// eslint-disable-next-line func-names, no-unused-vars
exports.seed = function(knex, Promise) {
  return Promise.all([
    knex
      .table('answers')
      .truncate()
      .then(() => knex.table('answers').insert(answers)),
  ]);
};
