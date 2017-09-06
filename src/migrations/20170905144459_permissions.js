// eslint-disable-next-line func-names
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('permissions', table => {
      table
        .increments('id')
        .unsigned()
        .primary();
      table
        .integer('role_id')
        .unsigned()
        .notNull();
      table.string('role_name').notNull();
      table
        .integer('user_id')
        .unsigned()
        .notNull();
      table.string('user_name').notNull();
      table
        .integer('feature_id')
        .unsigned()
        .notNull();
      table.integer('status').notNull();
    }),
  ]);
};
// eslint-disable-next-line func-names
exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable('permissions')]);
};
