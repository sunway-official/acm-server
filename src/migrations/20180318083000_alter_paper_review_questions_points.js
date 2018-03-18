exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('paper_review_questions_points', table => {
      table.timestamp('created_at');
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('paper_review_questions_points', table => {
      table.dropColumn('created_at');
    }),
  ]);
};
