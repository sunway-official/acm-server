const newsPhotos = require('../seedData/newsPhotosData');

// eslint-disable-next-line func-names, no-unused-vars
exports.seed = function(knex, Promise) {
  return Promise.all([
    knex
      .table('news_photos')
      .truncate()
      .then(() => knex.table('news_photos').insert(newsPhotos)),
  ]);
};
