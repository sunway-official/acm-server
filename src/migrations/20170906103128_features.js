// eslint-disable-next-line func-names
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('features', table => {
      table.string('id').primary();
      table.text('description').nullable();
    }),
  ]);
};

// eslint-disable-next-line func-names
exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable('features')]);
};
