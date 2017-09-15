// eslint-disable-next-line func-names
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('questions', table => {
      table.increments('id').primary();
      table
        .integer('user_id')
        .unsigned()
        .notNullable();
      table
        .integer('activity_id')
        .unsigned()
        .notNullable();
      table.text('content');
      table.timestamp('created_at').defaultTo(knex.fn.now());
    }),
  ]);
};

// eslint-disable-next-line func-names
exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable('questions')]);
};
