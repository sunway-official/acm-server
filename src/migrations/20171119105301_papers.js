// eslint-disable-next-line func-names
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('papers', table => {
      table
        .increments('id')
        .unsigned()
        .primary();
      table
        .integer('conference_id')
        .unsigned()
        .notNullable();
      table
        .integer('paper_status_id')
        .unsigned()
        .notNullable();
      table.string('title');
      table.text('abstract');
      table.string('keywords');
      table.text('file');
      table.string('status');
      table.timestamps();
    }),
  ]);
};

// eslint-disable-next-line func-names
exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable('papers')]);
};
