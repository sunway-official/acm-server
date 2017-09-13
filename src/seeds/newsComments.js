const newsComments = require('../seedData/newsCommentsData');

// eslint-disable-next-line func-names, no-unused-vars
exports.seed = function(knex, Promise) {
  return Promise.all([
    knex
      .table('news_comments')
      .truncate()
      .then(() => knex.table('news_comments').insert(newsComments)),
  ]);
};
