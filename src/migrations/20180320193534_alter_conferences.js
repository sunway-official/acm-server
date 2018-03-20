exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('conferences', table => {
      table
        .string('bg_image')
        .nullable()
        .alter();
      table.timestamp('dl_submit_abstract');
      table.timestamp('dl_review_abstract');
      table.timestamp('dl_release_abstract');
      table.timestamp('dl_re_submit_abstract');
      table.timestamp('dl_re_review_abstract');
      table.timestamp('dl_release_final_abstract');
      table.timestamp('dl_submit_paper');
      table.timestamp('dl_review_paper');
      table.timestamp('dl_release_paper');
      table.timestamp('dl_re_submit_paper');
      table.timestamp('dl_re_review_paper');
      table.timestamp('dl_release_final_paper');
      table.timestamp('dl_registration');
      table.timestamps();
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('conferences', table => {
      table
        .string('bg_image')
        .notNullable()
        .alter();
      table.dropColumn('dl_submit_abstract');
      table.dropColumn('dl_review_abstract');
      table.dropColumn('dl_release_abstract');
      table.dropColumn('dl_re_submit_abstract');
      table.dropColumn('dl_re_review_abstract');
      table.dropColumn('dl_release_final_abstract');
      table.dropColumn('dl_submit_paper');
      table.dropColumn('dl_review_paper');
      table.dropColumn('dl_release_paper');
      table.dropColumn('dl_re_submit_paper');
      table.dropColumn('dl_re_review_paper');
      table.dropColumn('dl_release_final_paper');
      table.dropColumn('dl_registration');
    }),
  ]);
};
