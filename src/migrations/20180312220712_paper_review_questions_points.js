exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('paper_review_questions_points', table => {
      table.increments('id');
      table.integer('conference_id').unsigned();
      table.integer('user_id').unsigned();
      table.integer('paper_id').unsigned();
      table.integer('review_question_id').unsigned();
      table.float('point');
      table.text('comment');
      table.string('paper_title');
      table.string('reviewer_name');
      table.text('content');
      table.string('paper_status');
      table.string('topic_name');
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable('paper_review_questions_points')]);
};
