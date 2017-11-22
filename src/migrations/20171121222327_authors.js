// eslint-disable-next-line func-names
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('authors', table => {
      table
        .increments('id')
        .unsigned()
        .primary();
      table.string('name');
      table.string('email');
      table.string('title');
    }),
  ]);
};

// eslint-disable-next-line func-names
exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable('authors')]);
};
