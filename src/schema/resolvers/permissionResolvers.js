export default {
  Query: {
    getAllPermissions: async (
      root,
      data,
      { models: { Permission }, ValidationError },
    ) => {
      try {
        const permissions = await Permission.query();
        return permissions;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError('bad-request');
      }
    },

    getPermissionById: async (
      root,
      { id },
      { models: { Permission }, ValidationError },
    ) => {
      try {
        const permission = await Permission.query().findById(id);
        return permission;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError('permission not found');
      }
    },
  },
};
