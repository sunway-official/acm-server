export default {
  Color: {
    topics: async ({ id }, data, { models: { Topic } }) => {
      const topics = await Topic.query().where('color_id', id);
      return topics;
    },
  },
  Query: {
    getAllColors: async (
      root,
      data,
      { models: { Color }, ValidationError },
    ) => {
      try {
        const colors = await Color.query();
        return colors;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError('bad-request');
      }
    },
    getColorByID: async (
      root,
      { id },
      { models: { Color }, ValidationError },
    ) => {
      try {
        const color = await Color.query().findById(id);
        if (!color) {
          throw new ValidationError('color-not-found');
        }
        return color;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
  },
  Mutation: {
    insertColor: async (root, data, { models: { Color }, ValidationError }) => {
      try {
        const newColor = await Color.query().insert(data);
        return newColor;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError('bad-request');
      }
    },
    updateColor: async (root, data, { models: { Color }, ValidationError }) => {
      try {
        const updateColor = await Color.query().updateAndFetchById(
          data.id,
          data,
        );
        return updateColor;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError('bad-request');
      }
    },
    deleteColor: async (
      root,
      { id },
      { models: { Color }, ValidationError },
    ) => {
      try {
        const color = await Color.query().findById(id);
        if (color) {
          await color.deleteAllRelationship();
          await Color.query().deleteById(id);
        } else {
          throw new ValidationError('Not found color');
        }
        return color;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
  },
};
