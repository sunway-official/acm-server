// const roles = require('./rolesData');
// const users = require('./userData');

// const {
//   participant,
//   speaker,
//   organizer,
//   author,
//   moderator,
//   reviewer,
//   supporter,
//   ticketChecker,
// } = require('./defaultPermissionsData');

// // array role_id want to add into permission
// const rolesID = [1, 2, 3, 4, 5, 6, 7, 8];

// // array role_id want to add into permission

// // user_id want to become a organizer
// const organizersID = [1, 2, 5, 6, 7, 8, 9, 12, 13];

// // user_id want to become a speaker
// const speakersID = [3, 24];

// // user_id want to become a author
// const authorsID = [20, 21];

// // user_id want to become a reviewer
// const reviewersID = [22, 23];
// // user_id want to become a ticketChecker

// const ticketCheckersID = [18, 17, 19];
// // user_id want to become a supporter

// const supportersID = [14, 15, 16];
// // user_id want to become a moderator

// const moderatorsID = [16, 17];

// // user_id want to become a participant
// const participantsID = [4];
// for (let i = 50; i < 100; i += 1) {
//   participantsID.push(i);
// }

// const conferenceIDs = [1, 2];

// // get name of roles with id
// function getRoleName(id) {
//   const roleName = roles[id - 1].name;
//   return roleName;
// }
// // get name of object with id
// function getUserName(id) {
//   const user = users[id - 1];
//   if (user) {
//     const username = `${user.firstname} ${user.lastname}`;
//     return username;
//   }
//   return '';
// }

// // get default features with role id
// // eslint-disable-next-line camelcase
// function getDefaultFeaturesWithRoleID(role_id) {
//   let features = [];
//   // eslint-disable-next-line camelcase
//   switch (role_id) {
//     case 1:
//       // eslint-disable-next-line prefer-destructuring
//       features = organizer.features;
//       break;
//     case 2:
//       // eslint-disable-next-line prefer-destructuring
//       features = speaker.features;
//       break;
//     case 3:
//       // eslint-disable-next-line prefer-destructuring
//       features = moderator.features;
//       break;
//     case 4:
//       // eslint-disable-next-line prefer-destructuring
//       features = supporter.features;
//       break;
//     case 5:
//       // eslint-disable-next-line prefer-destructuring
//       features = ticketChecker.features;
//       break;
//     case 6:
//       // eslint-disable-next-line prefer-destructuring
//       features = reviewer.features;
//       break;
//     case 7:
//       // eslint-disable-next-line prefer-destructuring
//       features = author.features;
//       break;
//     case 8:
//       // eslint-disable-next-line prefer-destructuring
//       features = participant.features;
//       break;
//     default:
//       features = [];
//   }
//   return features;
// }

// // lay id cua cac user ma ta muon them vao tung` role
// // eslint-disable-next-line camelcase
// function getUsersIDWithRoleID(role_id) {
//   let usersID = [];
//   // eslint-disable-next-line camelcase
//   switch (role_id) {
//     case 1:
//       usersID = organizersID;
//       break;
//     case 2:
//       usersID = speakersID;
//       break;
//     case 3:
//       usersID = moderatorsID;
//       break;
//     case 4:
//       usersID = supportersID;
//       break;
//     case 5:
//       usersID = ticketCheckersID;
//       break;
//     case 6:
//       usersID = reviewersID;
//       break;
//     case 7:
//       usersID = authorsID;
//       break;
//     case 8:
//       usersID = participantsID;
//       break;
//     default:
//       usersID = [];
//   }
//   return usersID;
// }

// // them cac features mac dinh theo role_id cho user
// // eslint-disable-next-line camelcase, no-shadow
// function getPermissions(role_id, usersID, features, conference_id) {
//   const result = [];
//   // eslint-disable-next-line camelcase, array-callback-return
//   usersID.map(user_id => {
//     // eslint-disable-next-line camelcase, array-callback-return
//     features.map(feature => {
//       const { feature_id } = feature;
//       // eslint-disable-next-line
//       const temp = {
//         role_id,
//         role_name: getRoleName(role_id),
//         user_id,
//         full_name: getUserName(user_id),
//         feature_id,
//         status: 'on',
//         conference_id,
//       };
//       result.push(temp);
//     });
//   });

//   return result;
// }

// // get all permissions add into table
// // eslint-disable-next-line
// function getAllPermissions() {
//   let result = [];

//   // eslint-disable-next-line camelcase, array-callback-return
//   conferenceIDs.map(conference_id => {
//     // eslint-disable-next-line camelcase, array-callback-return
//     rolesID.map(role_id => {
//       const temp = getPermissions(
//         role_id,
//         getUsersIDWithRoleID(role_id),
//         getDefaultFeaturesWithRoleID(role_id),
//         conference_id,
//       );
//       result = result.concat(temp);
//     });
//   });

//   return result;
// }

// const permissions = getAllPermissions();

// module.exports = permissions;
