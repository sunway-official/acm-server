export default {
  DefaultPermission: {
    role: async ({ role_id }, data, { models: { Role } }) => {
      const role = await Role.query().findById(role_id);
      return role;
    },
    feature: async ({ feature_id }, data, { models: { Feature } }) => {
      const feature = await Feature.query().findById(feature_id);
      return feature;
    },
  },
  Query: {
    getAllDefaultPermissions: async (
      root,
      data,
      { models: { DefaultPermission }, ValidationError },
    ) => {
      try {
        const defaultPermissions = await DefaultPermission.query();
        return defaultPermissions;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError('bad-request');
      }
    },

    getDefaultPermissionByID: async (
      root,
      { id },
      { models: { DefaultPermission }, ValidationError },
    ) => {
      try {
        const defaultPermission = await DefaultPermission.query().findById(id);
        if (!defaultPermission) {
          throw new ValidationError('defaultPermission-not-found');
        }
        return defaultPermission;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
  },
  Mutation: {
    insertDefaultPermission: async (
      root,
      data,
      { models: { DefaultPermission }, ValidationError },
    ) => {
      try {
        const newDefaultPermission = await DefaultPermission.query().insert(
          data,
        );
        return newDefaultPermission;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError('bad-request');
      }
    },
    updateDefaultPermission: async (
      root,
      data,
      { models: { DefaultPermission }, ValidationError },
    ) => {
      try {
        const updateDefaultPermission = await DefaultPermission.query().updateAndFetchById(
          data.id,
          data,
        );
        return updateDefaultPermission;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError('bad-request');
      }
    },
    deleteDefaultPermission: async (
      root,
      { id },
      { models: { DefaultPermission }, ValidationError },
    ) => {
      try {
        const defaultPermission = await DefaultPermission.query().findById(id);
        await DefaultPermission.query().deleteById(id);
        return defaultPermission;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError('bad-request');
      }
    },
  },
};
