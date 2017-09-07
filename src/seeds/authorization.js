const users = require('../seedData/userData');

function genDate() {
  const date = new Date();
  return date;
}

const date = genDate();

function createUser(knex, user) {
  return knex
    .table('users')
    .truncate()
    .then(() =>
      knex
        .table('users')
        .returning('id')
        .insert({
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          password: user.password,
          gender: 'unknown',
          version_key: user.version_key,
          created_at: date,
          updated_at: date,
        }),
    );
}

// eslint-disable-next-line func-names, no-unused-vars
exports.seed = function(knex, Promise) {
  const usersList = [];
  users.forEach(user => {
    usersList.push(createUser(knex, user));
  });
  return Promise.all(usersList);
};
