exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('personal_schedules', table => {
      table.integer('paper_id').unsigned();
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('personal_schedules', table => {
      table.dropColumn('paper_id');
    }),
  ]);
};
