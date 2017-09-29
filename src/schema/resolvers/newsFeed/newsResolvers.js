export default {
  News: {
    user: async ({ user_id }, data, { models: { User }, ValidationError }) => {
      try {
        const user = await User.query().findById(user_id);
        return user;
      } catch (e) {
        // eslint-disable-next-line
        console.error(e);
        throw new ValidationError('bad-request', 'user');
      }
    },

    conference: async (
      { conference_id },
      data,
      { models: { Conference }, ValidationError },
    ) => {
      try {
        const conference = await Conference.query().findById(conference_id);
        return conference;
      } catch (e) {
        // eslint-disable-next-line
        console.error(e);
        throw new ValidationError('bad-request', 'conference');
      }
    },

    newsPhotos: async (
      { id },
      data,
      { models: { NewsPhoto }, ValidationError },
    ) => {
      try {
        const newsPhotos = await NewsPhoto.query().where('news_id', id);
        return newsPhotos;
      } catch (e) {
        // eslint-disable-next-line
        console.error(e);
        throw new ValidationError('bad-request', 'newsPhotos');
      }
    },
    newsLikes: async (
      { id },
      data,
      { models: { NewsLike }, ValidationError },
    ) => {
      try {
        const newsPhotos = await NewsLike.query().where('news_id', id);
        return newsPhotos;
      } catch (e) {
        // eslint-disable-next-line
        console.error(e);
        throw new ValidationError('bad-request', 'newsLikes');
      }
    },
    newsComments: async (
      { id },
      data,
      { models: { NewsComment }, ValidationError },
    ) => {
      try {
        const newsComments = await NewsComment.query().where('news_id', id);
        return newsComments;
      } catch (e) {
        // eslint-disable-next-line
        console.error(e);
        throw new ValidationError('bad-request', 'newsComments');
      }
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
        const news = await News.query().where('user_id', user_id);
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
        const news = await News.query().where('conference_id', conference_id);
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
        // delete all NewsComment of news with id
        // delete all NewsLike of news with id
        // delete all NewsPhoto of news with id
        await news.deleteAllRelationship();

        if (!news) throw new ValidationError('Not found news');

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
