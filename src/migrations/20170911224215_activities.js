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
        .integer('paper_id')
        .unsigned()
        .defaultTo(0);
      table.string('title');
      table.text('description').defaultTo(' ');
    }),
  ]);
};

// eslint-disable-next-line func-names
exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable('activities')]);
};
