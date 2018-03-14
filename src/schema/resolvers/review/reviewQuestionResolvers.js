export default {
  ReviewQuestion: {
    conference: async ({ conference_id }, data, { models: { Conference } }) => {
      const conference = await Conference.query().findById(conference_id);
      return conference;
    },
  },

  Query: {
    getAllReviewQuestions: async (
      root,
      data,
      { models: { ReviewQuestion }, ValidationError, user },
    ) => {
      if (!user) {
        throw new ValidationError('unauthorized');
      }
      const reviewQuestions = await ReviewQuestion.query().where(
        'conference_id',
        user.current_conference_id,
      );
      return reviewQuestions;
    },
  },
  Mutation: {
    insertReviewQuestion: async (
      root,
      data,
      { models: { ReviewQuestion }, ValidationError, user },
    ) => {
      if (!user) {
        throw new ValidationError('unauthorized');
      }
      const newData = data;
      newData.conference_id = user.current_conference_id;
      const reviewQuestion = await ReviewQuestion.query().insert(newData);
      return reviewQuestion;
    },
  },
};
