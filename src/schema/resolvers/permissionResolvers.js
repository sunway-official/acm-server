export default {
  Permission: {
    // type role of permission
    role: async ({ role_id }, data, { models: { Role } }) => {
      const role = Role.query().findById(role_id);
      return role;
    },
    // type user of permission
    user: async ({ user_id }, data, { models: { User } }) => {
      const user = User.query().findById(user_id);
      return user;
    },

    feature: async ({ feature_id }, data, { models: { Feature } }) => {
      const feature = Feature.query().findById(feature_id);
      return feature;
    },
  },

  // query of permission
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

  //  mutation of permission
  Mutation: {
    insertPermission: async (
      root,
      data,
      { models: { Permission }, ValidationError },
    ) => {
      try {
        const permission = await Permission.query().insert(data);
        return permission;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError('Cant insert permission');
      }
    },

    // updatePermission: async (root, data, { models: { Permission } }) => {},

    deletePermission: async (
      root,
      { id },
      { models: { Permission }, ValidationError },
    ) => {
      try {
        const permission = await Permission.query().findById(id);
        // delete permission
        await Permission.query().deleteById(id);
        return permission;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError('Cant insert permission');
      }
    },
  },
};
