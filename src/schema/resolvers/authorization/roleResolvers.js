export default {
  Role: {
    defaultPermissions: async (
      { id },
      data,
      { models: { DefaultPermission } },
    ) => {
      const defaultPermissions = await DefaultPermission.query().where(
        'role_id',
        id,
      );
      return defaultPermissions;
    },
    permissions: async ({ id }, data, { models: { Permission } }) => {
      const defaultPermissions = await Permission.query().where('role_id', id);
      return defaultPermissions;
    },
  },

  Query: {
    getAllRoles: async (root, data, { models: { Role }, ValidationError }) => {
      try {
        const roles = await Role.query();
        return roles;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError('bad-request');
      }
    },
    getRoleByID: async (
      root,
      { id },
      { models: { Role }, ValidationError },
    ) => {
      try {
        const role = await Role.query().findById(id);
        if (!role) {
          throw new ValidationError('role-not-found');
        }
        return role;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        if (e.message === 'role-not-found') {
          throw new ValidationError('role-not-found');
        }
        throw new ValidationError('bad-request');
      }
    },
  },
  Mutation: {
    insertRole: async (root, data, { models: { Role }, ValidationError }) => {
      try {
        const newRole = await Role.query().insert(data);
        return newRole;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError('bad-request');
      }
    },
    updateRole: async (
      root,
      { id, name },
      { models: { Role }, ValidationError },
    ) => {
      try {
        const updateRole = await Role.query().updateAndFetchById(id, {
          name,
        });
        return updateRole;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError('bad-request');
      }
    },
    deleteRole: async (root, { id }, { models: { Role }, ValidationError }) => {
      try {
        const role = await Role.query().findById(id);
        if (!role) throw new ValidationError('Role not found');
        // delete defaultpermission with role id
        // delete permission with role id
        role.deleteAllRelationship();

        // delete role
        await Role.query().deleteById(id);
        return role;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError('bad-request');
      }
    },
  },
};
