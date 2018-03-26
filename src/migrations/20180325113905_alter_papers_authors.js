exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('papers_authors', table => {
      table.renameColumn('street', 'author_street');
      table.renameColumn('city', 'author_city');
      table.string('author_zipcode');
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('papers_authors', table => {
      table.renameColumn('author_street', 'street');
      table.renameColumn('author_city', 'city');
      table.dropColumn('author_zipcode');
    }),
  ]);
};
