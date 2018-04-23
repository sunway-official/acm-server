exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('user_relationships_in_conferences', table => {
      table
        .increments('id')
        .unsigned()
        .primary();
      table
        .integer('follower_id')
        .unsigned()
        .notNullable();
      table
        .integer('following_id')
        .unsigned()
        .notNullable();
      table
        .integer('conference_id')
        .unsigned()
        .notNullable();
      table.string('follower_followers_count');
      table.string('follower_firstname');
      table.string('follower_lastname');
      table.string('follower_avatar');
      table.string('following_followers_count');
      table.string('following_firstname');
      table.string('following_lastname');
      table.string('following_avatar');
    }),
    knex.schema.alterTable('users', table => {
      table.integer('followers_count');
      table.integer('followings_count');
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('user_relationships_in_conferences'),
    knex.schema.alterTable('users', table => {
      table.dropColumn('followers_count');
      table.dropColumn('followings_count');
    }),
  ]);
};
