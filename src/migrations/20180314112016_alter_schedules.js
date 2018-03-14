exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('schedules', table => {
      table.integer('paper_id').unsigned();
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('schedules', table => {
      table.dropColumn('paper_id');
    }),
  ]);
};
