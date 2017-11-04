// eslint-disable-next-line func-names
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('landing_pages', table => {
      table
        .increments('id')
        .unsigned()
        .primary();
      table
        .integer('conference_id')
        .unsigned()
        .notNullable();
      table.string('slogan').notNullable();
      table.text('register_description').notNullable();
      table.text('call_paper_description').notNullable();
      table.text('speaker_description').notNullable();
      table.string('email').notNullable();
      table.string('phone_number').notNullable();
      table.string('facebook_id');
      table.string('twitter_id');
      table.string('linkedin_id');
    }),
  ]);
};

// eslint-disable-next-line func-names
exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable('landing_pages')]);
};
