export default {
  PaperAuthor: {
    paper: async ({ paper_id }, data, { models: { Paper } }) => {
      const paper = await Paper.query().findById(paper_id);
      return paper;
    },
    author: async ({ author_id }, data, { models: { Author } }) => {
      const author = await Author.query().findById(author_id);
      return author;
    },
  },

  Query: {
    getAllPapersAuthors: async (
      root,
      data,
      { models: { PaperAuthor }, ValidationError, user },
    ) => {
      try {
        if (!user) {
          throw new ValidationError('unauthorized');
        }
        const papersAuthors = await PaperAuthor.query();
        return papersAuthors;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
    getAuthorsByPaperID: async (
      root,
      { paper_id },
      { models: { PaperAuthor }, ValidationError },
    ) => {
      try {
        const authors = await PaperAuthor.query().where('paper_id', paper_id);
        return authors;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
  },

  Mutation: {
    insertPaperAuthor: async (
      root,
      data,
      { models: { PaperAuthor }, ValidationError },
    ) => {
      try {
        const newPaperAuthor = await PaperAuthor.query().insert(data);
        return newPaperAuthor;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },

    updateAuthorOfPaper: async (
      root,
      { paper_id, author_id },
      { models: { PaperAuthor }, ValidationError },
    ) => {
      try {
        const paper = await PaperAuthor.query().where('paper_id', paper_id);

        const updateAuthorOfPaper = await paper.$query().updateAndFetch({
          author_id,
        });
        return updateAuthorOfPaper;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
    deletePaperAuthor: async (
      root,
      { id },
      { models: { PaperAuthor }, ValidationError },
    ) => {
      try {
        const paperAuthor = await PaperAuthor.query().findById(id);
        if (!paperAuthor) throw new ValidationError('Not found PaperAuthor');
        await PaperAuthor.query().deleteById(id);
        return paperAuthor;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
  },
};
