// eslint-disable-next-line func-names
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('topics', table => {
      table
        .increments('id')
        .unsigned()
        .primary();
      table
        .integer('conference_id')
        .unsigned()
        .notNullable();
      table.string('name').notNullable();
      table.text('description').notNullable();
      table
        .integer('color_id')
        .unsigned()
        .notNullable();
      table.string('color_code');
      table.integer('is_chosen').defaultTo('0');
    }),
  ]);
};

// eslint-disable-next-line func-names
exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable('topics')]);
};
