// eslint-disable-next-line func-names
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('papers_authors', table => {
      table
        .increments('id')
        .unsigned()
        .primary();
      table.integer('paper_id').unsigned();
      table.integer('author_id').unsigned();
      table.integer('corresponding').defaultTo(1);
      table.string('author_name');
      table.string('author_email');
      table.string('author_title');
    }),
  ]);
};

// eslint-disable-next-line func-names
exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable('papers_authors')]);
};
