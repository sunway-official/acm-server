// eslint-disable-next-line func-names
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('conference_topics', table => {
      table
        .increments('id')
        .unsigned()
        .primary();
      table
        .integer('conference_id')
        .unsigned()
        .notNullable();
      table
        .integer('topic_id')
        .unsigned()
        .notNullable();
    }),
  ]);
};

// eslint-disable-next-line func-names
exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable('conference_topics')]);
};
