// eslint-disable-next-line func-names
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('schedules', table => {
      table.increments('id').primary();
      table
        .integer('activity_id')
        .unsigned()
        .notNullable();
      table.integer('conference_id').unsigned();
      table
        .integer('room_id')
        .unsigned()
        .notNullable();
      table.timestamp('start');
      table.timestamp('end');
      table.string('activity_title');
      table.text('activity_description');
      table.string('activity_status');
      table.string('room_name');
      table.string('room_seats');
      table.string('room_status');
    }),
  ]);
};

// eslint-disable-next-line func-names
exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable('schedules')]);
};
