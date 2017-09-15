const features = require('../seedData/authorization/featuresData');

// eslint-disable-next-line func-names, no-unused-vars
exports.seed = function(knex, Promise) {
  return Promise.all([
    knex
      .table('features')
      .truncate()
      .then(() => knex.table('features').insert(features)),
  ]);
};
