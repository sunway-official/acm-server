// eslint-disable-next-line func-names
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('default_permissions', table => {
      table
        .increments('id')
        .unsigned()
        .primary();
      table
        .integer('role_id')
        .unsigned()
        .notNullable();
      table.string('feature_id').nullable();
    }),
  ]);
};

// eslint-disable-next-line func-names
exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable('default_permissions')]);
};
