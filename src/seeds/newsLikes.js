const newsLikes = require('../seedData/newsLikesData');

// eslint-disable-next-line func-names, no-unused-vars
exports.seed = function(knex, Promise) {
  return Promise.all([
    knex
      .table('news_likes')
      .truncate()
      .then(() => knex.table('news_likes').insert(newsLikes)),
  ]);
};
