export default {
  NewsPhoto: {
    news: async ({ news_id }, data, { models: { News } }) => {
      const news = await News.query().findById(news_id);
      return news;
    },
  },
  Query: {
    getAllNewsPhotos: async (
      root,
      data,
      { models: { NewsPhoto }, ValidationError },
    ) => {
      try {
        const newsPhoto = await NewsPhoto.query();
        return newsPhoto;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError('bad-request');
      }
    },
    getNewsPhotoByID: async (
      root,
      { id },
      { models: { NewsPhoto }, ValidationError },
    ) => {
      try {
        const newsPhoto = await NewsPhoto.query().findById(id);
        if (!newsPhoto) {
          throw new ValidationError('newsPhoto-not-found');
        }
        return newsPhoto;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        if (e.message === 'newsPhoto-not-found') {
          throw new ValidationError('newsPhoto-not-found');
        }
        throw new ValidationError('bad-request');
      }
    },
    getNewsPhotoByNewsID: async (
      root,
      { news_id },
      { models: { NewsPhoto }, ValidationError },
    ) => {
      try {
        const newsPhoto = await NewsPhoto.query().where('news_id', news_id);
        if (!newsPhoto) {
          throw new ValidationError('newsPhoto-not-found');
        }
        return newsPhoto;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        if (e.message === 'newsPhoto-not-found') {
          throw new ValidationError('newsPhoto-not-found');
        }
        throw new ValidationError('bad-request');
      }
    },
  },
  Mutation: {
    insertNewsPhoto: async (
      root,
      data,
      { models: { NewsPhoto }, ValidationError },
    ) => {
      try {
        const newsPhoto = await NewsPhoto.query().insert(data);
        return newsPhoto;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError('bad-request');
      }
    },
    updateNewsPhoto: async (
      root,
      data,
      { models: { NewsPhoto }, ValidationError },
    ) => {
      try {
        const updateNewsPhoto = await NewsPhoto.query().updateAndFetchById(
          data.id,
          data,
        );
        return updateNewsPhoto;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError('bad-request');
      }
    },
    deleteNewsPhoto: async (
      root,
      { id },
      { models: { NewsPhoto }, ValidationError },
    ) => {
      try {
        const newsPhoto = await NewsPhoto.query().findById(id);
        await NewsPhoto.query().deleteById(id);
        return newsPhoto;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError('bad-request');
      }
    },
  },
};
