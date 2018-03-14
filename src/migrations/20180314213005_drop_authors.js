exports.up = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable('authors')]);
};

exports.down = function(knex, Promise) {
  return Promise.all([]);
};
