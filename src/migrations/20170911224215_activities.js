// eslint-disable-next-line func-names
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('activities', table => {
      table.increments('id').primary();
      table
        .integer('conference_id')
        .unsigned()
        .notNullable();
      table
        .integer('activity_id')
        .unsigned()
        .notNullable();
      table.string('title');
      table.string('status');
    }),
  ]);
};

// eslint-disable-next-line func-names
exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable('activities')]);
};
