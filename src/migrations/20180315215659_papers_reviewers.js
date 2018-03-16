exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('papers_reviewers', table => {
      table.increments('id');
      table.integer('conference_id').unsigned();
      table.integer('paper_id').unsigned();
      table.integer('user_id').unsigned();
      table.string('paper_title');
      table.string('paper_status');
      table.string('reviewer_name');
      table.string('topic_name');
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable('papers_reviewers')]);
};
