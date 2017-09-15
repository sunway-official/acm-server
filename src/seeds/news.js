const news = require('../seedData/newsData');

// eslint-disable-next-line func-names, no-unused-vars
exports.seed = function(knex, Promise) {
  return Promise.all([
    knex
      .table('news')
      .truncate()
      .then(() => knex.table('news').insert(news)),
  ]);
};
