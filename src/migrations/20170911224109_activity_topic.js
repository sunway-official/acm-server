// eslint-disable-next-line func-names
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('activity_topic', table => {
      table.increments('id').primary();
      table
        .integer('activity_id')
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
  return Promise.all([knex.schema.dropTable('activity_topic')]);
};
