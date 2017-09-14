const questions = require('../seedData/questionsData');

// eslint-disable-next-line func-names, no-unused-vars
exports.seed = function(knex, Promise) {
  return Promise.all([
    knex
      .table('questions')
      .truncate()
      .then(() => knex.table('questions').insert(questions)),
  ]);
};
