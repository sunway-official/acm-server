export default {
  Follower: {
    conference: async ({ id }, data, { models: { Conference } }) => {
      const conference = await Conference.query().where('conference_id', id);
      return conference;
    },
    user: async ({ follower_id }, data, { models: { User } }) => {
      const user = await User.query().where('id', follower_id);
      return user;
    },
    following: async ({ following_id }, data, { models: { User } }) => {
      const user = await User.query().where('id', following_id);
      return user;
    },
    firstname: ({ follower_firstname }) => follower_firstname,
    lastname: ({ follower_lastname }) => follower_lastname,
    avatar: ({ follower_avatar }) => follower_avatar,
    followers_count: ({ follower_followers_count }) => follower_followers_count,
    is_following: async (
      { follower_id },
      data,
      { models: { ConferenceUserRelationship }, ValidationError, user },
    ) => {
      if (!user) {
        throw new ValidationError('unauthorized');
      }

      if (!user.current_conference_id === 0) {
        throw new ValidationError('no-current-conference');
      }

      const result = await ConferenceUserRelationship.query()
        .where({
          conference_id: user.current_conference_id,
          following_id: user.id,
          follower_id,
        })
        .first();
      return !!result;
    },
  },

  Query: {
    getFollowers: async (
      root,
      { user_id },
      { models: { ConferenceUserRelationship }, ValidationError, user },
    ) => {
      if (!user) {
        throw new ValidationError('unauthorized');
      }

      if (!user.current_conference_id === 0) {
        throw new ValidationError('no-current-conference');
      }

      try {
        const followers = await ConferenceUserRelationship.query().where({
          conference_id: user.current_conference_id,
          following_id: user_id || user.id,
        });
        return followers;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
  },
  Mutation: {
    followUser: async (
      root,
      { user_id: following_user_id },
      { models: { ConferenceUserRelationship }, ValidationError, user },
    ) => {
      if (!user) {
        throw new ValidationError('unauthorized');
      }

      if (!user.current_conference_id === 0) {
        throw new ValidationError('no-current-conference');
      }

      try {
        const followingUser = await ConferenceUserRelationship.query().insert({
          follower_id: user.id,
          following_id: following_user_id,
          conference_id: user.current_conference_id,
        });
        return followingUser;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
    unfollowUser: async (
      root,
      { user_id: unfollowing_user_id },
      { models: { ConferenceUserRelationship }, ValidationError, user },
    ) => {
      if (!user) {
        throw new ValidationError('unauthorized');
      }

      if (!user.current_conference_id === 0) {
        throw new ValidationError('no-current-conference');
      }

      try {
        const result = await ConferenceUserRelationship.query()
          .delete()
          .where({
            follower_id: user.id,
            following_id: unfollowing_user_id,
            conference_id: user.current_conference_id,
          });
        return {
          success: !!result,
          message: result ? 'Delete successfully.' : 'Delete fail.',
        };
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
  },
};
