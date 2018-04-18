const categoriesData = require('../seedData/conference/categoriesData');

// eslint-disable-next-line func-names, no-unused-vars
exports.seed = function(knex, Promise) {
  return knex
    .table('categories')
    .truncate()
    .then(() => knex.table('categories').insert(categoriesData));
};
