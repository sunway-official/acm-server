// eslint-disable-next-line func-names
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('news_photos', table => {
      table
        .increments('id')
        .unsigned()
        .primary();
      table
        .integer('news_id')
        .unsigned()
        .notNullable();
      table.string('name').notNullable();
      table.string('url').notNullable();
      table.timestamps();
    }),
  ]);
};

// eslint-disable-next-line func-names
exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable('news_photos')]);
};
