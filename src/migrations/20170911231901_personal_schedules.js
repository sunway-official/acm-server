// eslint-disable-next-line func-names
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('personal_schedules', table => {
      table.increments('id').primary();
      table
        .integer('user_id')
        .unsigned()
        .notNullable();
      table
        .integer('schedule_id')
        .unsigned()
        .notNullable();
      table
        .integer('conference_id')
        .unsigned()
        .notNullable();
      table
        .integer('activity_id')
        .unsigned()
        .notNullable();
    }),
  ]);
};

// eslint-disable-next-line func-names
exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable('personal_schedules')]);
};
