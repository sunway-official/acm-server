const reviewQuestionData = require('../seedData/review/reviewQuestionData');

// eslint-disable-next-line func-names, no-unused-vars
exports.seed = function(knex, Promise) {
  return Promise.all([
    knex
      .table('review_questions')
      .truncate()
      .then(() => knex.table('review_questions').insert(reviewQuestionData)),
  ]);
};
