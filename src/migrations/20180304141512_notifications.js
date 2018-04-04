// eslint-disable-next-line func-names
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('notifications', table => {
      table.increments('id').primary();
      table.string('title').notNullable();
      table.text('content');
      table.boolean('read').defaultTo(false);
      table.boolean('hide').defaultTo(false);
      table
        .integer('sender_id')
        .unsigned()
        .notNullable();
      table
        .integer('receiver_id')
        .unsigned()
        .notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    }),
  ]);
};

// eslint-disable-next-line func-names
exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable('notifications')]);
};
