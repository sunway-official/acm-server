const paperReviewerData = require('../seedData/review/paperReviewerData');

// eslint-disable-next-line func-names, no-unused-vars
exports.seed = function(knex, Promise) {
  return Promise.all([
    knex
      .table('papers_reviewers')
      .truncate()
      .then(() => knex.table('papers_reviewers').insert(paperReviewerData)),
  ]);
};
