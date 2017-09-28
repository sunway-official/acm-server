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
      {
        organizer_detail_id,
        address_id,
        title,
        description,
        start_date,
        end_date,
        bg_image,
      },
      { models: { Conference, OrganizerDetail }, ValidationError },
    ) => {
      try {
        const { user_id } = await OrganizerDetail.query().findById(
          organizer_detail_id,
        );
        const data = {
          organizer_detail_id,
          address_id,
          user_id,
          title,
          description,
          start_date,
          end_date,
          bg_image,
        };
        const conference = await Conference.query().insert(data);
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
      { models: { Conference, OrganizerDetail }, ValidationError },
    ) => {
      try {
        const { organizer_detail_id } = data;

        // eslint-disable-next-line camelcase
        if (organizer_detail_id) {
          const { user_id } = await OrganizerDetail.query().findById(
            organizer_detail_id,
          );
          Object.assign(data, data, {
            user_id,
          });
        }

        const updateConference = await Conference.query().updateAndFetchById(
          data.id,
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

        // delete all topics of conference with id
        // // delete ConferenceAttendee with conference_id
        // // delete News with conference_id
        // // delete Activity with conference_id
        await conference.deleteAllRelationship();
        if (!conference) throw new ValidationError('Not found conference');

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
