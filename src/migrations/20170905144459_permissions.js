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
        .notNullable();
      table.string('role_name').notNullable();
      table
        .integer('user_id')
        .unsigned()
        .notNullable();
      table.string('user_name').notNullable();
      table
        .integer('feature_id')
        .unsigned()
        .notNullable();
      table
        .enu('status', ['on', 'off'])
        .defaultTo('on')
        .notNullable();
    }),
  ]);
};
// eslint-disable-next-line func-names
exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable('permissions')]);
};
