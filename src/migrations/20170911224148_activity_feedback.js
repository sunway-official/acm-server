// eslint-disable-next-line func-names
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('activity_feedback', table => {
      table.increments('id').primary();
      table
        .integer('activity_id')
        .unsigned()
        .notNullable();
      table
        .integer('user_id')
        .unsigned()
        .notNullable();
      table.text('content');
      table.float('rating');
      table.timestamp('created_at').defaultTo(knex.fn.now());
    }),
  ]);
};

// eslint-disable-next-line func-names
exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable('activity_feedback')]);
};
