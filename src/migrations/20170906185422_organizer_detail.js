// eslint-disable-next-line func-names
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('organizer_detail', table => {
      table.increments('id').primary();
      table
        .integer('user_id')
        .unsigned()
        .notNullable();
      table.string('name').notNullable();
      table
        .string('email')
        .notNullable()
        .unique();
      table.string('address').notNullable();
      table.string('website').notNullable();
      table.string('phone').notNullable();
    }),
  ]);
};

// eslint-disable-next-line func-names
exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable('organizer_detail')]);
};
