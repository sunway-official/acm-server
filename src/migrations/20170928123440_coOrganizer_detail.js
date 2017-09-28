// eslint-disable-next-line func-names
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('coOrganizer_detail', table => {
      table
        .increments('id')
        .unsigned()
        .primary();
      table
        .integer('conference_id')
        .unsigned()
        .notNullable();
      table.string('name').notNullable();
      table.string('address').notNullable();
      table.string('email').notNullable();
      table.string('website').notNullable();
      table.string('phone').notNullable();
      table.timestamps();
    }),
  ]);
};

// eslint-disable-next-line func-names
exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable('coOrganizer_detail')]);
};
