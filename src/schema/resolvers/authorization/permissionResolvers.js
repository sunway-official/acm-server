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
    conference: async ({ conference_id }, data, { models: { Conference } }) => {
      const conference = Conference.query().findById(conference_id);
      return conference;
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

    // get all roles by user id
    getAllRolesByUserID: async (
      root,
      { user_id },
      { models: { Permission }, ValidationError, user },
    ) => {
      try {
        if (!user) {
          throw new ValidationError('unauthorized');
        }
        // eslint-disable-next-line
        const conference_id = user.current_conference_id;
        const permissions = await Permission.query()
          .where(builder => {
            builder
              .where('conference_id', conference_id)
              .where('user_id', user_id);
          })
          .distinct('role_id');
        return permissions;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
    // Get all role of login in admin page
    getAllRolesOfUser: async (
      root,
      data,
      { models: { Permission }, ValidationError, user },
    ) => {
      try {
        if (!user) {
          throw new ValidationError('unauthorized');
        }
        // eslint-disable-next-line
        const conference_id = user.current_conference_id;
        const permissions = await Permission.query()
          .where(builder => {
            builder
              // .where('conference_id', conference_id)
              .where('user_id', user.id);
          })
          .distinct('role_id');
        return permissions;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },

    // get all features by user_id
    getAllPermissionsByUserID: async (
      root,
      { user_id, conference_id },
      { models: { Permission }, ValidationError },
    ) => {
      try {
        const permissions = await Permission.query().where(builder => {
          builder
            .where('conference_id', conference_id)
            .where('user_id', user_id);
        });
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

    // getAllRolesActiveByUserId
    getAllRolesActiveByUserID: async (
      root,
      { user_id, conference_id },
      { models: { Permission }, ValidationError },
    ) => {
      try {
        const permissions = await Permission.query()
          .where(builder => {
            builder
              .where('status', 'on')
              .where('user_id', user_id)
              .where('conference_id', conference_id);
          })
          .distinct('role_id');
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
    updateUserRoleStatus: async (
      root,
      { user_id, role_id, status, conference_id },
      {
        models: { Permission, User, DefaultPermission, Role },
        ValidationError,
      },
    ) => {
      try {
        const checkRoleOfUser = await Permission.query().where({
          user_id,
          role_id,
          conference_id,
        });
        let permissions = [];
        if (checkRoleOfUser.length <= 0) {
          // console.log(conference_id);
          // get user with user_id
          const getUser = await User.query().findById(user_id);

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
              user_id,
              full_name: `${getUser.firstname} ${getUser.lastname}`,
              feature_id: defaultPermission.feature_id,
              conference_id,
            };

            // eslint-disable-next-line no-await-in-loop
            await Permission.query().insert(permission);
          }
        } else {
          await Permission.query()
            .update({ status })
            .where({
              user_id,
              role_id,
              conference_id,
            });
        }
        // return all permission of user with user_id
        permissions = await Permission.query().where('user_id', user_id);
        return permissions;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },

    // update status of feature
    updateStatusOfPermission: async (
      root,
      data,
      { models: { Permission }, ValidationError },
    ) => {
      try {
        const updatePermission = await Permission.query().updateAndFetchById(
          data.id,
          data,
        );
        return updatePermission;
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
