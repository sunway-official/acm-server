export default {
  Conference: {
    organizerDetail: async (
      { organizer_detail_id },
      data,
      { models: { OrganizerDetail } },
    ) => {
      const organizerDetail = await OrganizerDetail.query().findById(
        organizer_detail_id,
      );
      return organizerDetail;
    },
    address: async ({ address_id }, data, { models: { Address } }) => {
      const address = await Address.query().findById(address_id);
      return address;
    },
    user: async ({ user_id }, data, { models: { User } }) => {
      const user = await User.query().findById(user_id);
      return user;
    },
    rooms: async ({ id }, data, { models: { Room } }) => {
      const rooms = await Room.query().where('conference_id', id);
      return rooms;
    },
    conferenceAttendees: async (
      { id },
      data,
      { models: { ConferenceAttendee } },
    ) => {
      const conferenceAttendees = await ConferenceAttendee.query().where(
        'conference_id',
        id,
      );
      return conferenceAttendees;
    },
    coOrganizerDetails: async (
      { id },
      data,
      { models: { CoOrganizerDetail } },
    ) => {
      const coOrganizerDetails = await CoOrganizerDetail.query().where(
        'conference_id',
        id,
      );
      return coOrganizerDetails;
    },
    topics: async ({ id }, data, { models: { Topic } }) => {
      const topics = await Topic.query().where('conference_id', id);
      return topics;
    },
    news: async ({ id }, data, { models: { News } }) => {
      const news = await News.query().where('conference_id', id);
      return news;
    },
    activities: async ({ id }, data, { models: { Activity } }) => {
      const activities = await Activity.query().where('conference_id', id);
      return activities;
    },
    landingPage: async ({ id }, data, { models: { LandingPage } }) => {
      const landingPage = await LandingPage.query().where('conference_id', id);
      return landingPage;
    },
    papers: async ({ id }, data, { models: { Paper } }) => {
      const papers = await Paper.query().where('conference_id', id);
      return papers;
    },
  },
  Query: {
    getAllConferences: async (
      root,
      data,
      { models: { Conference }, ValidationError },
    ) => {
      try {
        const conferences = await Conference.query();
        return conferences;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
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
        throw new ValidationError(e);
      }
    },
    getCurrentConference: async (
      root,
      data,
      { models: { Conference }, ValidationError, user },
    ) => {
      try {
        if (!user) {
          throw new ValidationError('unauthorized');
        }
        // eslint-disable-next-line
        const conference_id = user.current_conference_id;
        const conference = await Conference.query().findById(conference_id);
        if (!conference) {
          throw new ValidationError('conference-not-found');
        }
        return conference;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
    getConferenceByOrganizerDetailID: async (
      root,
      { organizer_detail_id },
      { models: { Conference }, ValidationError },
    ) => {
      try {
        const conference = await Conference.query().wher(
          'organizer_detail_id',
          organizer_detail_id,
        );
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
        throw new ValidationError(e);
      }
    },
    getConferenceByAddressID: async (
      root,
      { address_id },
      { models: { Conference }, ValidationError },
    ) => {
      try {
        const conference = await Conference.query().where(
          'address_id',
          address_id,
        );
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
        throw new ValidationError(e);
      }
    },
    getConferenceByUserID: async (
      root,
      { user_id },
      { models: { Conference }, ValidationError },
    ) => {
      try {
        const conference = await Conference.query().where('user_id', user_id);
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
        throw new ValidationError(e);
      }
    },
    getConferenceByAddressIDOrganizerDetailID: async (
      root,
      { address_id, organizer_detail_id },
      { models: { Conference }, ValidationError },
    ) => {
      try {
        const conference = await Conference.query()
          .where('address_id', address_id)
          .where('organizer_detail_id', organizer_detail_id);
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
        throw new ValidationError(e);
      }
    },
  },
  Mutation: {
    insertConference: async (
      root,
      data,
      { models: { Conference, ConferenceAttendee }, ValidationError, user },
    ) => {
      try {
        if (!user) {
          throw new ValidationError('unauthorized');
        }

        const conference = await Conference.query().insert(data);
        await ConferenceAttendee.query().insert({
          conference_id: conference.id,
          user_id: user.id,
        });
        return conference;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
    updateConference: async (
      root,
      data,
      { models: { Conference }, ValidationError, user },
    ) => {
      try {
        if (!user) {
          throw new ValidationError('unauthorized');
        }
        const conference_id = data.id ? data.id : user.current_conference_id;

        const updateConference = await Conference.query().patchAndFetchById(
          conference_id,
          data,
        );
        return updateConference;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
    deleteConference: async (
      root,
      { id },
      { models: { Conference }, ValidationError },
    ) => {
      try {
        const conference = await Conference.query().findById(id);
        if (!conference) throw new ValidationError('Not found conference');

        await conference.deleteAllRelationship();
        await Conference.query().deleteById(id);
        return conference;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
  },
};
