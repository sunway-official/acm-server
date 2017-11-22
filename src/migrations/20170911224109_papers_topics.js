// eslint-disable-next-line func-names
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('papers_topics', table => {
      table.increments('id').primary();
      table
        .integer('paper_id')
        .unsigned()
        .notNullable();
      table
        .integer('topic_id')
        .unsigned()
        .notNullable();
      table.string('topic_name');
      table.text('topic_description');
      table.string('topic_color_code');
    }),
  ]);
};

// eslint-disable-next-line func-names
exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable('papers_topics')]);
};
