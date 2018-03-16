exports.up = function(knex, Promise) {
  return Promise.all([knex.schema.dropTableIfExists('authors')]);
};

exports.down = function(knex, Promise) {
  return Promise.all([]);
};
