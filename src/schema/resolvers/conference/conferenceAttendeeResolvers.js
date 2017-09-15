export default {
  ConferenceAttendee: {
    conference: async ({ conference_id }, data, { models: { Conference } }) => {
      const conference = await Conference.query().findById(conference_id);
      return conference;
    },
    user: async ({ user_id }, data, { models: { User } }) => {
      const user = await User.query().findById(user_id);
      return user;
    },
  },
  Query: {
    getAllConferenceAttendees: async (
      root,
      data,
      { models: { ConferenceAttendee }, ValidationError },
    ) => {
      try {
        const conferenceAttendee = await ConferenceAttendee.query();
        return conferenceAttendee;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError('bad-request');
      }
    },
    getConferenceAttendeeByID: async (
      root,
      { id },
      { models: { ConferenceAttendee }, ValidationError },
    ) => {
      try {
        const conferenceAttendee = await ConferenceAttendee.query().findById(
          id,
        );
        if (!conferenceAttendee) {
          throw new ValidationError('conferenceAttendee-not-found');
        }
        return conferenceAttendee;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        if (e.message === 'conferenceAttendee-not-found') {
          throw new ValidationError('conferenceAttendee-not-found');
        }
        throw new ValidationError('bad-request');
      }
    },
  },
  Mutation: {
    insertConferenceAttendee: async (
      root,
      data,
      { models: { ConferenceAttendee }, ValidationError },
    ) => {
      try {
        const newconferenceAttendee = await ConferenceAttendee.query().insert(
          data,
        );
        return newconferenceAttendee;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError('bad-request');
      }
    },
    updateConferenceAttendee: async (
      root,
      data,
      { models: { ConferenceAttendee }, ValidationError },
    ) => {
      try {
        const updateconferenceAttendee = await ConferenceAttendee.query().updateAndFetchById(
          data.id,
          data,
        );
        return updateconferenceAttendee;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError('bad-request');
      }
    },
    deleteConferenceAttendee: async (
      root,
      { id },
      { models: { ConferenceAttendee }, ValidationError },
    ) => {
      try {
        const conferenceAttendee = await ConferenceAttendee.query().findById(
          id,
        );
        await ConferenceAttendee.query().deleteById(id);
        return conferenceAttendee;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError('bad-request');
      }
    },
  },
};
