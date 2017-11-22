export default {
  Query: {
    getAllAuthors: async (
      root,
      data,
      { models: { Author }, ValidationError, user },
    ) => {
      try {
        if (!user) {
          throw new ValidationError('unauthorized');
        }
        const authors = await Author.query();
        return authors;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
    getAuthorByID: async (
      root,
      { id },
      { models: { Author }, ValidationError },
    ) => {
      try {
        const author = await Author.query().findById(id);
        if (!author) {
          throw new ValidationError('Author-not-found');
        }
        return author;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
  },
  Mutation: {
    insertAuthor: async (
      root,
      data,
      { models: { Author }, ValidationError, user },
    ) => {
      try {
        if (!user) {
          throw new ValidationError('unauthorized');
        }
        // eslint-disable-next-line
        const newAuthor = await Author.query().insert(data);
        return newAuthor;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
    updateAuthor: async (
      root,
      data,
      { models: { Author }, ValidationError, user },
    ) => {
      try {
        if (!user) {
          throw new ValidationError('unauthorized');
        }
        const updateAuthor = await Author.query().updateAndFetchById(
          data.id,
          data,
        );
        return updateAuthor;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
    deleteAuthor: async (
      root,
      { id },
      { models: { Author }, ValidationError },
    ) => {
      try {
        const author = await Author.query().findById(id);

        // delete author
        if (author) {
          await Author.query().deleteById(id);
        }
        return author;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
  },
};
