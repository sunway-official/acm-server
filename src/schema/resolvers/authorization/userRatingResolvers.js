const roundRatingValue = value => Math.round(value * 2) / 2;

export default {
  UserRating: {},

  Query: {
    getUserRating: async (
      root,
      { user_id },
      { models: { ConferenceUserRating }, user, ValidationError },
    ) => {
      if (!user) {
        throw new ValidationError('unauthorized');
      }

      if (!user.current_conference_id === 0) {
        throw new ValidationError('no-current-conference');
      }

      try {
        const userRating = await ConferenceUserRating.query()
          .where({
            conference_id: user.current_conference_id,
            user_id: user_id || user.id,
          })
          .first();
        return {
          id: Math.round(Math.random() * 1000),
          rating: roundRatingValue(userRating ? userRating.rating : 0),
        };
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
  },
  Mutation: {
    rateUser: async (
      root,
      { user_id, rating },
      { models: { ConferenceUserRating }, user, ValidationError },
    ) => {
      if (!user) {
        throw new ValidationError('unauthorized');
      }

      if (!user.current_conference_id === 0) {
        throw new ValidationError('no-current-conference');
      }

      try {
        // Delete old user rating data
        await ConferenceUserRating.query()
          .where({
            conference_id: user.current_conference_id,
            rater_id: user.id,
            user_id,
          })
          .delete();
        // Then add a refreshed one
        const userRating = await ConferenceUserRating.query().insert({
          conference_id: user.current_conference_id,
          rater_id: user.id,
          user_id,
          rating,
        });

        return {
          id: Math.round(Math.random() * 1000),
          rating: roundRatingValue(userRating ? userRating.rating : 0),
        };
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
  },
};
