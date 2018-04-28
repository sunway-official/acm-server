exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('conference_user_ratings', table => {
      table
        .increments('id')
        .unsigned()
        .primary();
      table
        .integer('rater_id')
        .unsigned()
        .notNullable();
      table
        .integer('user_id')
        .unsigned()
        .notNullable();
      table
        .integer('conference_id')
        .unsigned()
        .notNullable();
      table
        .float('rating')
        .default(0)
        .unsigned();
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable('conference_user_ratings')]);
};
