// eslint-disable-next-line func-names
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('activities', table => {
      table.increments('id').primary();
      table
        .integer('conference_id')
        .unsigned()
        .notNullable();
      table.string('title');
      table
        .enu('status', ['on', 'off'])
        .defaultTo('on')
        .notNullable();
      table.text('description');
    }),
  ]);
};

// eslint-disable-next-line func-names
exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable('activities')]);
};
