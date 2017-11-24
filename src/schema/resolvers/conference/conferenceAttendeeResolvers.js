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
        throw new ValidationError(e);
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
        throw new ValidationError(e);
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
        throw new ValidationError(e);
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
        throw new ValidationError(e);
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
        if (!conferenceAttendee)
          throw new ValidationError('Conference attendee not found');

        await ConferenceAttendee.query().deleteById(id);
        return conferenceAttendee;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
  },
};
