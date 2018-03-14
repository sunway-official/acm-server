export default {
  PaperStatus: {
    papers: async ({ id }, data, { models: { Paper } }) => {
      const papers = await Paper.query().where('paper_status_id', id);
      return papers;
    },
  },
  Query: {
    getAllPaperStatus: async (
      root,
      data,
      { models: { PaperStatus }, ValidationError, user },
    ) => {
      try {
        if (!user) {
          throw new ValidationError('unauthorized');
        }
        const status = await PaperStatus.query();
        return status;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
    getPaperStatusByID: async (
      root,
      { id },
      { models: { PaperStatus }, ValidationError, user },
    ) => {
      try {
        if (!user) {
          throw new ValidationError('unauthorized');
        }
        const status = await PaperStatus.query().findById(id);
        return status;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
  },
};
