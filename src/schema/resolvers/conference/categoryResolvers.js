export default {
  Category: {
    conferences: async ({ id }, data, { models: { Conference } }) => {
      const conferences = await Conference.query().where('category_id', id);
      return conferences;
    },
  },

  Query: {
    getAllCategories: async (
      root,
      data,
      { models: { Category }, ValidationError, user },
    ) => {
      try {
        if (!user) {
          throw new ValidationError('Unauthorite');
        }
        const categories = await Category.query();
        return categories;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
    getCategoryById: async (
      root,
      { id },
      { models: { Category }, ValidationError, user },
    ) => {
      try {
        if (!user) {
          throw new ValidationError('Unauthorite');
        }
        const category = await Category.query().findById(id);
        if (!category) {
          throw new ValidationError('category-not-found');
        }
        return category;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
  },
};
