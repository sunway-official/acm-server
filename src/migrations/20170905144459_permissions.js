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
        .defaultTo(8)
        .notNullable();
      table.string('role_name');
      table
        .integer('user_id')
        .unsigned()
        .notNullable();
      table.string('full_name');
      table
        .integer('conference_id')
        .unsigned()
        .notNullable();
      table.string('feature_id').nullable();
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
