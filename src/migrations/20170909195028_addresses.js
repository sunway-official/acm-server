// eslint-disable-next-line func-names
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('addresses', table => {
      table
        .increments('id')
        .unsigned()
        .primary();
      table.string('street').notNullable();
      table.string('city').notNullable();
      table.string('country').notNullable();
    }),
  ]);
};

// eslint-disable-next-line func-names
exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable('addresses')]);
};
