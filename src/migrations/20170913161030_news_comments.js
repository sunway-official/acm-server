// eslint-disable-next-line func-names
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('news_comments', table => {
      table
        .increments('id')
        .unsigned()
        .primary();
      table
        .integer('news_id')
        .unsigned()
        .notNullable();
      table
        .integer('user_id')
        .unsigned()
        .notNullable();
      table.string('content').notNullable();
      table.timestamps();
    }),
  ]);
};

// eslint-disable-next-line func-names
exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable('news_comments')]);
};
