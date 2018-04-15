exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('conferences', table => {
      table.integer('category_id');
      table.string('category_name');
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('conferences', table => {
      table.dropColumn('category_id');
      table.dropColumn('category_name');
    }),
  ]);
};
