exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('papers_authors', table => {
      table.string('author_street');
      table.string('author_city');
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('papers_authors', table => {
      table.dropColumn('author_street');
      table.dropColumn('author_city');
    }),
  ]);
};
