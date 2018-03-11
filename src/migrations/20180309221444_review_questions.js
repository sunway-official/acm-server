exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('review_questions', table => {
      table
        .increments('id')
        .unsigned()
        .primary();
      table.integer('conference_id').unsigned();
      table.text('content');
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable('review_questions')]);
};
