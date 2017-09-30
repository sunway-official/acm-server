const {
  speaker,
  participant,
  organizer,
  author,
  moderator,
  reviewer,
  supporter,
  ticketChecker,
} = require('../seedData/authorization/defaultPermissionsData');

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
  result = getDefaultPermissions(organizer.role_id, organizer.features)
    .concat(getDefaultPermissions(speaker.role_id, speaker.features))
    .concat(getDefaultPermissions(moderator.role_id, moderator.features))
    .concat(getDefaultPermissions(supporter.role_id, supporter.features))
    .concat(getDefaultPermissions(participant.role_id, participant.features))
    .concat(
      getDefaultPermissions(ticketChecker.role_id, ticketChecker.features),
    )
    .concat(getDefaultPermissions(reviewer.role_id, reviewer.features))
    .concat(getDefaultPermissions(author.role_id, author.features));

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
