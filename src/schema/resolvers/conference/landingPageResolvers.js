export default {
  LandingPage: {
    conference: async ({ conference_id }, data, { models: { Conference } }) => {
      const conference = await Conference.query().findById(conference_id);
      return conference;
    },
  },
  Query: {
    getLandingPageByConferenceId: async (
      root,
      { conference_id },
      { models: { LandingPage }, ValidationError },
    ) => {
      try {
        const landingPage = await LandingPage.query().where(
          'conference_id',
          conference_id,
        );
        if (!landingPage) {
          throw new ValidationError('landingPage-not-found');
        }
        return landingPage;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
  },
  Mutation: {
    insertLandingPage: async (
      root,
      data,
      { models: { LandingPage }, ValidationError },
    ) => {
      try {
        const newLandingPage = await LandingPage.query().insert(data);
        return newLandingPage;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
    updateLandingPage: async (
      root,
      data,
      { models: { LandingPage }, ValidationError },
    ) => {
      try {
        const updateLandingPage = await LandingPage.query().updateAndFetchById(
          data.id,
          data,
        );
        return updateLandingPage;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
    deleteLandingPage: async (
      root,
      { id },
      { models: { LandingPage }, ValidationError },
    ) => {
      try {
        const landingPage = await LandingPage.query().findById(id);
        if (!landingPage) throw new ValidationError('Not found LandingPage');
        await LandingPage.query().deleteById(id);
        return landingPage;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
  },
};
