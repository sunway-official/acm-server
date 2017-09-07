export default {
  Feature: {
    defaultPermissions: async (
      { id },
      data,
      { models: { DefaultPermission } },
    ) => {
      const defaultPermissions = await DefaultPermission.query().where(
        'feature_id',
        id,
      );
      return defaultPermissions;
    },
  },

  Query: {
    getAllFeatures: async (
      root,
      data,
      { models: { Feature }, ValidationError },
    ) => {
      try {
        const features = await Feature.query();
        return features;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError('bad-request');
      }
    },
    getFeatureByID: async (
      root,
      { id },
      { models: { Feature }, ValidationError },
    ) => {
      try {
        const feature = await Feature.query().findById(id);
        if (!feature) {
          throw new ValidationError('feature-not-found');
        }
        return feature;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        if (e.message === 'feature-not-found') {
          throw new ValidationError('feature-not-found');
        }
        throw new ValidationError('bad-request');
      }
    },
  },
  Mutation: {
    insertFeature: async (
      root,
      data,
      { models: { Feature }, ValidationError },
    ) => {
      try {
        const newFeature = await Feature.query().insert(data);
        return newFeature;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError('bad-request');
      }
    },
    updateFeature: async (
      root,
      { id, name },
      { models: { Feature }, ValidationError },
    ) => {
      try {
        const updateFeature = await Feature.query().updateAndFetchById(id, {
          name,
        });
        return updateFeature;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError('bad-request');
      }
    },
    deleteFeature: async (
      root,
      { id },
      { models: { Feature, DefaultPermission, Permission }, ValidationError },
    ) => {
      try {
        // delete permission with feature_id
        await Permission.query()
          .delete()
          .where('feature_id', id);

        // delete default permission with feature_id
        await DefaultPermission.query()
          .delete()
          .where('feature_id', id);

        const feature = await Feature.query().findById(id);
        await Feature.query().deleteById(id);
        return feature;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError('bad-request');
      }
    },
  },
};
