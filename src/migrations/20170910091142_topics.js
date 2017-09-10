// eslint-disable-next-line func-names
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('topics', table => {
      table
        .increments('id')
        .unsigned()
        .primary();
      table.string('name').notNullable();
      table.string('description').notNullable();
    }),
  ]);
};

// eslint-disable-next-line func-names
exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable('topics')]);
};
