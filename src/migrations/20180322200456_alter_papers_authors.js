exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('papers_authors', table => {
      table.string('street');
      table.string('city');
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('papers_authors', table => {
      table.dropColumn('street');
      table.dropColumn('city');
    }),
  ]);
};
