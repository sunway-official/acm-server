// eslint-disable-next-line func-names
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('answers', table => {
      table.increments('id').primary();
      table
        .integer('user_id')
        .unsigned()
        .notNullable();
      table
        .integer('question_id')
        .unsigned()
        .notNullable();
      table.text('content');
      table.timestamps();
    }),
  ]);
};

// eslint-disable-next-line func-names
exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable('answers')]);
};
