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

    // type feature of permission
    feature: async ({ feature_id }, data, { models: { Feature } }) => {
      const feature = Feature.query().findById(feature_id);
      return feature;
    },
  },

  // query of permission
  Query: {
    // get all permissions
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
        throw new ValidationError(e);
      }
    },

    // get permission by id
    getPermissionByID: async (
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
        throw new ValidationError(e);
      }
    },

    // get all user by role_id
    getAllUsersByRoleID: async (
      root,
      { role_id },
      { models: { Permission }, ValidationError },
    ) => {
      try {
        const permissions = await Permission.query()
          .where('role_id', role_id)
          .distinct('user_id');
        return permissions;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },

    // get all features by user_id
    getAllFeaturesByUserID: async (
      root,
      { user_id },
      { models: { Permission }, ValidationError },
    ) => {
      try {
        const permissions = await Permission.query()
          .where('user_id', user_id)
          .distinct('feature_id');

        return permissions;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },

    // get permission by user_id and role_id
    getPermissionByRoleIDUserID: async (
      root,
      { role_id, user_id },
      { models: { Permission }, ValidationError },
    ) => {
      try {
        const permissions = await Permission.query().where(builder => {
          builder.where('role_id', role_id).where('user_id', user_id);
        });
        return permissions;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
  },

  //  mutation of permission
  Mutation: {
    insertPermission: async (
      root,
      { user_id, role_id },
      {
        models: { Permission, User, DefaultPermission, Role },
        ValidationError,
      },
    ) => {
      try {
        // get user with user_id
        const user = await User.query().findById(user_id);

        // get default permission with role_id
        const defaultPermissions = await DefaultPermission.query().where(
          'role_id',
          role_id,
        );

        // get role with role_id
        const role = await Role.query().findById(role_id);

        // add default feature for user with role_id
        for (let i = 0; i < defaultPermissions.length; i += 1) {
          const defaultPermission = defaultPermissions[i];
          const permission = {
            role_id: role.id,
            role_name: role.name,
            user_id: user.id,
            user_name: `${user.firstname} ${user.lastname}`,
            feature_id: defaultPermission.feature_id,
          };

          // eslint-disable-next-line no-await-in-loop
          await Permission.query().insert(permission);
        }

        // return all permission of user with user_id
        const permissions = await Permission.query().where('user_id', user_id);
        return permissions;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },

    // update status of permission
    updateStatusPermission: async (
      root,
      { id, status },
      { models: { Permission }, ValidationError },
    ) => {
      try {
        const updatePermission = await Permission.query().updateAndFetchById(
          id,
          { status },
        );
        return updatePermission;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },

    updateRoleOfUserInPermission: async (
      root,
      { role_id, user_id },
      {
        models: { Permission, Role, User, DefaultPermission },
        ValidationError,
      },
    ) => {
      try {
        // get user with user_id
        const user = await User.query().findById(user_id);

        // get role with role_id
        const role = await Role.query().findById(role_id); // role id, name

        // get default feature with new role_id
        const defaultPermissions = await DefaultPermission.query().where(
          'role_id',
          role_id,
        );

        // delete all permision with user_id
        await Permission.query()
          .delete()
          .where('user_id', user_id);

        // add new feature of new role for user
        for (let i = 0; i < defaultPermissions.length; i += 1) {
          const defaultPermission = defaultPermissions[i];
          const permission = {
            role_id,
            role_name: role.name,
            user_id,
            user_name: `${user.firstname} ${user.lastname}`,
            feature_id: defaultPermission.feature_id,
          };
          // insert permission
          // eslint-disable-next-line no-await-in-loop
          await Permission.query().insert(permission);
        }

        const updateRoleOfUser = await Permission.query().where(
          'user_id',
          user_id,
        );

        return updateRoleOfUser;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },

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
        throw new ValidationError(e);
      }
    },
  },
};
