export default {
  CoOrganizerDetail: {
    conference: async ({ conference_id }, data, { models: { Conference } }) => {
      const conference = await Conference.query().findById(conference_id);
      return conference;
    },
  },
  Query: {
    getAllCoOrganizerDetails: async (
      root,
      data,
      { models: { CoOrganizerDetail }, ValidationError },
    ) => {
      try {
        const coOrganizerDetail = await CoOrganizerDetail.query();
        return coOrganizerDetail;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
    getCoOrganizerDetailByID: async (
      root,
      { id },
      { models: { CoOrganizerDetail }, ValidationError },
    ) => {
      try {
        const coOrganizerDetail = await CoOrganizerDetail.query().findById(id);
        if (!coOrganizerDetail) {
          throw new ValidationError('coOrganizerDetail-not-found');
        }
        return coOrganizerDetail;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        if (e.message === 'coOrganizerDetail-not-found') {
          throw new ValidationError('coOrganizerDetail-not-found');
        }
        throw new ValidationError(e);
      }
    },
    getCoOrganizerDetailByConferenceID: async (
      root,
      { conference_id },
      { models: { CoOrganizerDetail }, ValidationError },
    ) => {
      try {
        const coOrganizerDetail = await CoOrganizerDetail.query().wher(
          'conference_id',
          conference_id,
        );
        if (!coOrganizerDetail) {
          throw new ValidationError('CoOrganizerDetail-not-found');
        }
        return coOrganizerDetail;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        if (e.message === 'CoOrganizerDetail-not-found') {
          throw new ValidationError('CoOrganizerDetail-not-found');
        }
        throw new ValidationError(e);
      }
    },
  },
  Mutation: {
    insertCoOrganizerDetail: async (
      root,
      data,
      { models: { CoOrganizerDetail }, ValidationError, user },
    ) => {
      try {
        if (!user) {
          throw new ValidationError('unauthorized');
        }
        // eslint-disable-next-line
        const conference_id = user.current_conference_id;
        // eslint-disable-next-line
        data.conference_id = conference_id;
        const newCoOrganizerDetail = await CoOrganizerDetail.query().insert(
          data,
        );
        return newCoOrganizerDetail;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
    updateCoOrganizerDetail: async (
      root,
      data,
      { models: { CoOrganizerDetail }, ValidationError },
    ) => {
      try {
        // eslint-disable-next-line
        data.conference_id = conference_id;
        const updateCoOrganizerDetail = await CoOrganizerDetail.query().updateAndFetchById(
          data.id,
          data,
        );
        return updateCoOrganizerDetail;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
    deleteCoOrganizerDetail: async (
      root,
      { id },
      { models: { CoOrganizerDetail }, ValidationError },
    ) => {
      try {
        const deleteCoOrganizerDetail = await CoOrganizerDetail.query().findById(
          id,
        );
        if (!deleteCoOrganizerDetail)
          throw new ValidationError('Not found CoOrganizerDetail');
        await CoOrganizerDetail.query().deleteById(id);
        return deleteCoOrganizerDetail;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
  },
};
