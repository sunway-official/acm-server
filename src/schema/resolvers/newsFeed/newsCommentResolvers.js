export default {
  NewsComment: {
    news: async ({ news_id }, data, { models: { News } }) => {
      const news = await News.query().findById(news_id);
      return news;
    },
    user: async ({ user_id }, data, { models: { User } }) => {
      const user = await User.query().findById(user_id);
      return user;
    },
  },
  Query: {
    getAllNewsComments: async (
      root,
      data,
      { models: { NewsComment }, ValidationError },
    ) => {
      try {
        const newsComment = await NewsComment.query();
        return newsComment;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError('bad-request');
      }
    },
    getNewsCommentByID: async (
      root,
      { id },
      { models: { NewsComment }, ValidationError },
    ) => {
      try {
        const newsComment = await NewsComment.query().findById(id);
        if (!newsComment) {
          throw new ValidationError('newsComment-not-found');
        }
        return newsComment;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        if (e.message === 'newsComment-not-found') {
          throw new ValidationError('newsComment-not-found');
        }
        throw new ValidationError('bad-request');
      }
    },
    getNewsCommentByNewsID: async (
      root,
      { news_id },
      { models: { NewsComment }, ValidationError },
    ) => {
      try {
        const newsComment = await NewsComment.query().where('news_id', news_id);
        if (!newsComment) {
          throw new ValidationError('newsComment-not-found');
        }
        return newsComment;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        if (e.message === 'newsComment-not-found') {
          throw new ValidationError('newsComment-not-found');
        }
        throw new ValidationError(e);
      }
    },
    getNewsCommentByUserID: async (
      root,
      { user_id },
      { models: { NewsComment }, ValidationError },
    ) => {
      try {
        const newsComment = await NewsComment.query().where('user_id', user_id);
        if (!newsComment) {
          throw new ValidationError('newsComment-not-found');
        }
        return newsComment;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        if (e.message === 'newsComment-not-found') {
          throw new ValidationError('newsComment-not-found');
        }
        throw new ValidationError('bad-request');
      }
    },
  },
  Mutation: {
    insertNewsComment: async (
      root,
      data,
      { models: { NewsComment }, ValidationError },
    ) => {
      try {
        const newsCommentInsert = await NewsComment.query().insert(data);
        return newsCommentInsert;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError('bad-request');
      }
    },
    updateNewsComment: async (
      root,
      data,
      { models: { NewsComment }, ValidationError },
    ) => {
      try {
        const updateNewsComment = await NewsComment.query().updateAndFetchById(
          data.id,
          data,
        );
        return updateNewsComment;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError('bad-request');
      }
    },
    deleteNewsComment: async (
      root,
      { id },
      { models: { NewsComment }, ValidationError },
    ) => {
      try {
        const deleteNewsComment = await NewsComment.query().findById(id);
        await NewsComment.query().deleteById(id);
        return deleteNewsComment;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError('bad-request');
      }
    },
  },
};
