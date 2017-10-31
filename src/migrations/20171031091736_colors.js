// eslint-disable-next-line func-names
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('colors', table => {
      table
        .increments('id')
        .unsigned()
        .primary();
      table.string('name').notNullable();
      table.string('code').notNullable();
    }),
  ]);
};

// eslint-disable-next-line func-names
exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable('colors')]);
};
