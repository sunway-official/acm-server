const permissions = require('../seedData/authorization/permissionsData');

const getSplitedData = data => {
  const result = [];
  // Split data by an array of 500
  while (data.length > 500) {
    result.push(data.splice(0, 500));
  }
  // Push the rest items of the array
  result.push(data);
  return result;
};

// eslint-disable-next-line func-names, no-unused-vars
exports.seed = function(knex, Promise) {
  return Promise.all([
    getSplitedData(permissions).map(data =>
      knex
        .table('permissions')
        .truncate()
        .then(() => knex.table('permissions').insert(data)),
    ),
  ]);
};
