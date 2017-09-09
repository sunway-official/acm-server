export default {
  Conference: {
    user: async ({ user_id }, data, { models: { User } }) => {
      const user = await User.query().findById(user_id);
      return user;
    },
    OrganizerDetail: async (
      { organizer_id },
      data,
      { models: { OrganizerDetail } },
    ) => {
      const organizerDetail = await OrganizerDetail.query().findById(
        organizer_id,
      );
      return organizerDetail;
    },
  },
  Query: {
    getAllConferences: async (
      root,
      data,
      { models: { Conference }, ValidationError },
    ) => {
      try {
        const conference = await Conference.query();
        return conference;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError('bad-request');
      }
    },
    getConferenceByID: async (
      root,
      { id },
      { models: { Conference }, ValidationError },
    ) => {
      try {
        const conference = await Conference.query().findById(id);
        if (!conference) {
          throw new ValidationError('conference-not-found');
        }
        return conference;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        if (e.message === 'conference-not-found') {
          throw new ValidationError('conference-not-found');
        }
        throw new ValidationError('bad-request');
      }
    },
    getConferenceByUserID: async (
      root,
      { user_id },
      { models: { Conference }, ValidationError },
    ) => {
      try {
        const conference = await Conference.query().findById(user_id);
        if (!conference) {
          throw new ValidationError('conference-not-found');
        }
        return conference;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        if (e.message === 'conference-not-found') {
          throw new ValidationError('conference-not-found');
        }
        throw new ValidationError('bad-request');
      }
    },
    getConferenceByOrganizerDetailID: async (
      root,
      { organizer_id },
      { models: { Conference }, ValidationError },
    ) => {
      try {
        const conference = await Conference.query().findById(organizer_id);
        if (!conference) {
          throw new ValidationError('conference-not-found');
        }
        return conference;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        if (e.message === 'conference-not-found') {
          throw new ValidationError('conference-not-found');
        }
        throw new ValidationError('bad-request');
      }
    },
  },
  Mutation: {
    insertConference: async (
      root,
      data,
      { models: { Conference, User, OrganizerDetail }, ValidationError },
    ) => {
      try {
        const userIdInsert = await User.query().findById(data.user_id);
        if (!userIdInsert) {
          throw new ValidationError('user-not-exist');
        }
        const OrganizerDetailIdInsert = await OrganizerDetail.query().findById(
          data.organizer_id,
        );
        if (!OrganizerDetailIdInsert) {
          throw new ValidationError('OrganizerDetail-not-exist');
        }
        const conference = await Conference.query().insert(data);
        return conference;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError('bad-request');
      }
    },
    updateConference: async (
      root,
      data,
      { models: { Conference, User, OrganizerDetail }, ValidationError },
    ) => {
      try {
        if (data.user_id != null) {
          const userIdInsert = await User.query().findById(data.user_id);
          if (!userIdInsert) {
            throw new ValidationError('user-not-exist');
          }
        }
        if (data.organizer_id != null) {
          const organizerDetailIdInsert = await OrganizerDetail.query().findById(
            data.organizer_id,
          );
          if (!organizerDetailIdInsert) {
            throw new ValidationError('user-not-exist');
          }
        }
        const updateConference = await Conference.query().updateAndFetchById(
          data.id,
          data,
        );
        return updateConference;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError('bad-request');
      }
    },
    deleteConference: async (
      root,
      { id },
      { models: { Conference }, ValidationError },
    ) => {
      try {
        const conference = await Conference.query().findById(id);
        await Conference.query().deleteById(id);
        return conference;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError('bad-request');
      }
    },
  },
};
