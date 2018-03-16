exports.up = function(knex, Promise) {
  return Promise.all([knex.schema.dropTableIfExists('authors')]);
};

exports.down = function(knex, Promise) {
  // Re-create authors table
  return require('./20171121222327_authors').up(knex, Promise); // eslint-disable-line
};
