const rooms = require('../seedData/roomsData');

// eslint-disable-next-line func-names, no-unused-vars
exports.seed = function(knex, Promise) {
  return knex
    .table('rooms')
    .truncate()
    .then(() => knex.table('rooms').insert(rooms));
};
