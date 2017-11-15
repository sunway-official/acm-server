const roleStaff = [5];

const getAllParticipantsInConference = async (
  // eslint-disable-next-line camelcase
  conference_id,
  ConferenceAttendee,
  User,
  Permission,
) => {
  // all users in conference
  const conferenceAttendee = await ConferenceAttendee.query()
    .where('conference_id', conference_id)
    .distinct('user_id');

  const usersInConference = conferenceAttendee.map(a => a.user_id);
  // eslint-disable-next-line no-console
  console.log(usersInConference); // [1,2 3]

  // 4, 9 ,3 , 7, 8
  const permissions = await Permission.query()
    .whereIn('role_id', roleStaff)
    .distinct('user_id');

  //  user of staff id
  const usersOfStaff = permissions.map(a => a.user_id);

  // eslint-disable-next-line no-console
  // console.log(usersOfStaff); // [8,3,4,7,9]

  // user in staff in conference
  const usersInStaffInConference = [];

  usersInConference.forEach(user => {
    if (usersOfStaff.includes(user)) {
      usersInStaffInConference.push(user);
    }
  }, this);

  // eslint-disable-next-line no-console
  // console.log(usersInStaffInConference);

  const staff = await User.query().whereIn('id', usersInStaffInConference);
  return staff;
};

export default {
  Query: {
    getAllParticipantsInConference: async (
      root,
      { conference_id },
      { models: { ConferenceAttendee, User, Permission } },
    ) =>
      getAllParticipantsInConference(
        conference_id,
        ConferenceAttendee,
        User,
        Permission,
      ),
  },
};
