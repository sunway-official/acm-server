const paperReviewQuestionData = require('../seedData/review/paperReviewQuestionPointData');

// // eslint-disable-next-line func-names, no-unused-vars
exports.seed = function(knex, Promise) {
  return Promise.all([
    knex
      .table('paper_review_questions_points')
      .truncate()
      .then(() =>
        knex
          .table('paper_review_questions_points')
          .insert(paperReviewQuestionData),
      ),
  ]);
};
