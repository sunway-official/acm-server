// eslint-disable-next-line func-names
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('conferences', table => {
      table.increments('id').primary();
      table
        .integer('organizer_detail_id')
        .unsigned()
        .notNullable();
      table
        .integer('address_id')
        .unsigned()
        .notNullable();
      table
        .integer('user_id')
        .unsigned()
        .notNullable();
      table.string('title').notNullable();
      table.text('description').notNullable();
      table.timestamp('start_date').notNullable();
      table.timestamp('end_date').notNullable();
      table.string('bg_image').notNullable();
    }),
  ]);
};

// eslint-disable-next-line func-names
exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable('conferences')]);
};
