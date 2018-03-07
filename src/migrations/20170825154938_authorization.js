// eslint-disable-next-line func-names
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', table => {
      table.increments('id').primary();
      table
        .integer('current_conference_id')
        .notNullable()
        .default(0);
      table.string('firstname').notNullable();
      table.string('lastname').notNullable();
      table.string('password').notNullable();
      table
        .string('email')
        .notNullable()
        .unique();
      table
        .enu('gender', ['male', 'female', 'unknown'])
        .defaultTo('unknown')
        .notNullable();
      table.string('phone_number').nullable();
      table.timestamp('dob').nullable();
      table.string('version_key').notNullable();
      table.string('title').nullable();
      table.string('bio').nullable();
      table.string('language').nullable();
      table.string('avatar').nullable();
      table.string('organization').nullable();
      table.string('position').nullable();
      table.string('address_id').nullable();
      table.string('interested_in').nullable();
      table.string('linkedin_id').nullable();
      table.string('facebook_id').nullable();
      table.string('twitter_id').nullable();
      table.string('notification_key').nullable();
      table.timestamps();
    }),
  ]);
};

// eslint-disable-next-line func-names
exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable('users')]);
};
