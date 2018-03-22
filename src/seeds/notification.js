const notifications = require('../seedData/notifications');

// eslint-disable-next-line func-names, no-unused-vars
exports.seed = function(knex, Promise) {
  return knex
    .table('notifications')
    .truncate()
    .then(() => knex.table('notifications').insert(notifications));
};
