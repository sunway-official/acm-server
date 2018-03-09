// eslint-disable-next-line func-names
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('papers_authors', table => {
      table
        .increments('id')
        .unsigned()
        .primary();
      table.integer('paper_id').unsigned();
      table.integer('user_id').unsigned();
      table.integer('conference_id').unsigned();
      table.integer('corresponding').defaultTo(0);
      table.string('author_name');
      table.string('author_email');
      table.string('author_title');
      table.string('author_organization');
      table.string('author_country');
      table.string('paper_status');
    }),
  ]);
};

// eslint-disable-next-line func-names
exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable('papers_authors')]);
};
