export default {
  PaperReviewer: {
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
    getAllPapersWithReviewer: async (
      root,
      data,
      { models: { PaperReviewer }, ValidationError, user },
    ) => {
      if (!user) {
        throw new ValidationError('unauthorized');
      }
      const paperReview = await PaperReviewer.query();

      return paperReview;
    },
  },

  Mutation: {
    insertPaperReviewer: async (
      root,
      data,
      { models: { PaperReviewer }, ValidationError, user },
    ) => {
      if (!user) {
        throw new ValidationError('unauthorized');
      }
      const paperReviewer = await PaperReviewer.query().insert(data);
      return paperReviewer;
    },
  },
};
