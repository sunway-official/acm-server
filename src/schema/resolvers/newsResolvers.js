export default {
  News: {
    user: async ({ user_id }, data, { models: { User } }) => {
      const user = await User.query().findById(user_id);
      return user;
    },

    conference: async ({ conference_id }, data, { models: { Conference } }) => {
      const conference = await Conference.query().findById(conference_id);
      return conference;
    },

    newsPhotos: async ({ id }, data, { models: { NewsPhoto } }) => {
      const newsPhotos = await NewsPhoto.query().where('news_id', id);
      return newsPhotos;
    },
    newsLikes: async ({ id }, data, { models: { NewsLike } }) => {
      const newsPhotos = await NewsLike.query().where('news_id', id);
      return newsPhotos;
    },
    newsComments: async ({ id }, data, { models: { NewsComment } }) => {
      const newsComments = await NewsComment.query().where('news_id', id);
      return newsComments;
    },
  },
  Query: {
    getAllNews: async (root, data, { models: { News }, ValidationError }) => {
      try {
        const news = await News.query();
        return news;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError('bad-request');
      }
    },
    getNewsByID: async (
      root,
      { id },
      { models: { News }, ValidationError },
    ) => {
      try {
        const news = await News.query().findById(id);
        if (!news) {
          throw new ValidationError('news-not-found');
        }
        return news;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        if (e.message === 'news-not-found') {
          throw new ValidationError('news-not-found');
        }
        throw new ValidationError('bad-request');
      }
    },
    getNewsByUserID: async (
      root,
      { user_id },
      { models: { News }, ValidationError },
    ) => {
      try {
        const news = await News.query().wher('user_id', user_id);
        if (!news) {
          throw new ValidationError('news-not-found');
        }
        return news;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        if (e.message === 'news-not-found') {
          throw new ValidationError('news-not-found');
        }
        throw new ValidationError('bad-request');
      }
    },
    getNewsByConferenceID: async (
      root,
      { conference_id },
      { models: { News }, ValidationError },
    ) => {
      try {
        const news = await News.query().wher('conference_id', conference_id);
        if (!news) {
          throw new ValidationError('news-not-found');
        }
        return news;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        if (e.message === 'news-not-found') {
          throw new ValidationError('news-not-found');
        }
        throw new ValidationError('bad-request');
      }
    },
  },
  Mutation: {
    insertNews: async (root, data, { models: { News }, ValidationError }) => {
      try {
        const news = await News.query().insert(data);
        return news;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError('bad-request');
      }
    },
    updateNews: async (root, data, { models: { News }, ValidationError }) => {
      try {
        const updateNews = await News.query().updateAndFetchById(data.id, data);
        return updateNews;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError('bad-request');
      }
    },
    deleteNews: async (root, { id }, { models: { News }, ValidationError }) => {
      try {
        const news = await News.query().findById(id);
        await News.query().deleteById(id);
        return news;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError('bad-request');
      }
    },
  },
};
