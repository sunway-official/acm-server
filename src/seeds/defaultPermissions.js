const {
  speaker,
  participant,
  organizer,
} = require('../seedData/defaultPermissionsData');

// eslint-disable-next-line camelcase
function getDefaultPermissions(role_id, features) {
  const temp = [];
  for (let i = 0; i < features.length; i += 1) {
    const feature = features[i];

    const defaultPermission = {
      role_id,
      feature_id: feature.feature_id,
    };
    temp.push(defaultPermission);
  }

  return temp;
}

// get all default permission
function getAllData() {
  let result = [];
  result = getDefaultPermissions(participant.role_id, participant.features)
    .concat(getDefaultPermissions(speaker.role_id, speaker.features))
    .concat(getDefaultPermissions(organizer.role_id, organizer.features));

  return result;
}

// eslint-disable-next-line func-names, no-unused-vars
exports.seed = function(knex, Promise) {
  return Promise.all([
    knex
      .table('default_permissions')
      .truncate()
      .then(() => knex.table('default_permissions').insert(getAllData())),
  ]);
};
