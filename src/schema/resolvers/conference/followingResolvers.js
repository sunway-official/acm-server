export default {
  Following: {
    conference: async ({ id }, data, { models: { Conference } }) => {
      const conference = await Conference.query().where('conference_id', id);
      return conference;
    },
    user: async ({ following_id }, data, { models: { User } }) => {
      const user = await User.query().where('id', following_id);
      return user;
    },
    follower: async ({ follower_id }, data, { models: { User } }) => {
      const user = await User.query().where('id', follower_id);
      return user;
    },
    firstname: ({ following_firstname }) => following_firstname,
    lastname: ({ following_lastname }) => following_lastname,
    avatar: ({ following_avatar }) => following_avatar,
    followers_count: ({ following_followers_count }) =>
      following_followers_count,
  },

  Query: {
    getFollowings: async (
      root,
      data,
      { models: { ConferenceUserRelationship }, ValidationError, user },
    ) => {
      if (!user) {
        throw new ValidationError('unauthorized');
      }

      if (!user.current_conference_id === 0) {
        throw new ValidationError('no-current-conference');
      }
      try {
        const followings = await ConferenceUserRelationship.query().where({
          conference_id: user.current_conference_id,
          follower_id: user.id,
        });
        return followings;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
  },
};
