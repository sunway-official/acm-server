export default {
  NewsLike: {
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
    getAllNewsLikes: async (
      root,
      data,
      { models: { NewsLike }, ValidationError, user },
    ) => {
      if (!user) {
        throw new ValidationError('unauthorized');
      }
      try {
        const newsLike = await NewsLike.query();
        return newsLike;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError('bad-request');
      }
    },
    getNewsLikeByID: async (
      root,
      { id },
      { models: { NewsLike }, ValidationError, user },
    ) => {
      if (!user) {
        throw new ValidationError('unauthorized');
      }
      try {
        const newsLike = await NewsLike.query().findById(id);
        if (!newsLike) {
          throw new ValidationError('newsLike-not-found');
        }
        return newsLike;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError('bad-request');
      }
    },
  },
  Mutation: {
    insertNewsLike: async (
      root,
      data,
      { models: { NewsLike }, ValidationError, user },
    ) => {
      if (!user) {
        throw new ValidationError('unauthorized');
      }
      try {
        const newsLikeInsert = await NewsLike.query().insert({
          ...data,
          user_id: user.id,
        });
        return newsLikeInsert;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError('bad-request');
      }
    },
    updateNewsLike: async (
      root,
      data,
      { models: { NewsLike }, ValidationError, user },
    ) => {
      if (!user) {
        throw new ValidationError('unauthorized');
      }
      try {
        const updateNewsLike = await NewsLike.query().updateAndFetchById(
          data.id,
          data,
        );
        return updateNewsLike;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError('bad-request');
      }
    },
    deleteNewsLike: async (
      root,
      { id },
      { models: { NewsLike }, ValidationError, user },
    ) => {
      if (!user) {
        throw new ValidationError('unauthorized');
      }
      try {
        const deleteNewsLike = await NewsLike.query().findById(id);
        await NewsLike.query().deleteById(id);
        return deleteNewsLike;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError('bad-request');
      }
    },
  },
};
