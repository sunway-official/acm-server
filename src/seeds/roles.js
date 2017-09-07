const roles = require('../seedData/rolesData');

function createRole(knex, role) {
  return knex
    .table('roles')
    .truncate() // delete table roles but remain the same structure
    .then(() =>
      knex
        .table('roles')
        .returning('id')
        .insert({
          name: role.name,
        }),
    );
}

// eslint-disable-next-line func-names, no-unused-vars
exports.seed = function(knex, Promise) {
  const rolesList = [];
  roles.forEach(role => {
    rolesList.push(createRole(knex, role));
  });
  return Promise.all(rolesList);
};
