export default {
  PaperReviewQuestionPoint: {
    user: async ({ user_id }, data, { models: { User } }) => {
      const user = await User.query().findById(user_id);
      return user;
    },
    paper: async ({ paper_id }, data, { models: { Paper } }) => {
      const paper = await Paper.query().findById(paper_id);
      return paper;
    },
  },

  Query: {
    getPaperReviewByUserIdPaperId: async (
      root,
      { user_id, paper_id },
      { models: { PaperReviewQuestionPoint }, ValidationError, user },
    ) => {
      if (!user) {
        throw new ValidationError('unauthorized');
      }
      const paperReview = await PaperReviewQuestionPoint.query().where(
        builder =>
          builder
            .where('user_id', user_id)
            .where('paper_id', paper_id)
            .where('conference_id', user.current_conference_id),
      );

      return paperReview;
    },
  },

  Mutation: {
    insertPaperReviewQuestion: async (
      root,
      data,
      { models: { PaperReviewQuestionPoint }, ValidationError, user },
    ) => {
      if (!user) {
        throw new ValidationError('unauthorized');
      }
      const paperReview = await PaperReviewQuestionPoint.query().insert(data);
      return paperReview;
    },
  },
};
