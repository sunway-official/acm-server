const roles = require('./rolesData');
const users = require('./userData');
const {
  participant,
  speaker,
  organizer,
  author,
} = require('./defaultPermissionsData');

// array role_id want to add into permission
const rolesID = [1, 2, 5, 8];

// array role_id want to add into permission

// user_id want to become a organizer
const organizersID = [2, 5, 6];

// user_id want to become a speaker
const speakersID = [3, 7, 8];

// user_id want to become a author
const authorsID = [3];

// user_id want to become a participant
const participantsID = [4, 9];

// get name of roles with id
function getRoleName(id) {
  const roleName = roles[id - 1].name;
  return roleName;
}
// get name of object with id
function getUserName(id) {
  const user = users[id - 1];
  if (user) {
    const username = `${user.firstname} ${user.lastname}`;
    return username;
  }
  return '';
}

// get default features with role id
// eslint-disable-next-line camelcase
function getDefaultFeaturesWithRoleID(role_id) {
  let features = [];
  // eslint-disable-next-line camelcase
  switch (role_id) {
    case 1:
      // eslint-disable-next-line prefer-destructuring
      features = organizer.features;
      break;
    case 2:
      // eslint-disable-next-line prefer-destructuring
      features = speaker.features;
      break;
    case 5:
      // eslint-disable-next-line prefer-destructuring
      features = participant.features;
      break;
    case 8:
      // eslint-disable-next-line prefer-destructuring
      features = author.features;
      break;
    default:
      features = [];
  }
  return features;
}

// lay id cua cac user ma ta muon them vao tung` role
// eslint-disable-next-line camelcase
function getUsersIDWithRoleID(role_id) {
  let usersID = [];
  // eslint-disable-next-line camelcase
  switch (role_id) {
    case 1:
      usersID = organizersID;
      break;
    case 2:
      usersID = speakersID;
      break;
    case 5:
      usersID = participantsID;
      break;
    case 8:
      usersID = authorsID;
      break;
    default:
      usersID = [];
  }
  return usersID;
}

// them cac features mac dinh theo role_id cho user
// eslint-disable-next-line camelcase
function getPermissions(role_id, usersID, features) {
  const result = [];
  // eslint-disable-next-line camelcase, array-callback-return
  usersID.map(user_id => {
    // eslint-disable-next-line camelcase, array-callback-return
    features.map(feature => {
      const { feature_id } = feature;
      const temp = {
        role_id,
        role_name: getRoleName(role_id),
        user_id,
        user_name: getUserName(user_id),
        feature_id,
        status: 'on',
      };
      result.push(temp);
    });
  });

  return result;
}

// get all permissions add into table
function getAllPermissions() {
  let result = [];

  // eslint-disable-next-line camelcase, array-callback-return
  rolesID.map(role_id => {
    const temp = getPermissions(
      role_id,
      getUsersIDWithRoleID(role_id),
      getDefaultFeaturesWithRoleID(role_id),
    );
    result = result.concat(temp);
  });

  return result;
}

const permissions = getAllPermissions();

module.exports = permissions;
