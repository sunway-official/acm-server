export default {
  OrganizerDetail: {
    user: async ({ user_id }, data, { models: { User } }) => {
      const user = await User.query().findById(user_id);
      return user;
    },
  },
  Query: {
    getAllOrganizerDetails: async (
      root,
      data,
      { models: { OrganizerDetail }, ValidationError },
    ) => {
      try {
        const organizerDetail = await OrganizerDetail.query();
        return organizerDetail;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError('bad-request');
      }
    },
    getOrganizerDetailByID: async (
      root,
      { id },
      { models: { OrganizerDetail }, ValidationError },
    ) => {
      try {
        const organizerDetail = await OrganizerDetail.query().findById(id);
        if (!organizerDetail) {
          throw new ValidationError('organizerDetail-not-found');
        }
        return organizerDetail;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        if (e.message === 'organizerDetail-not-found') {
          throw new ValidationError('organizerDetail-not-found');
        }
        throw new ValidationError('bad-request');
      }
    },
  },
  Mutation: {
    insertOrganizerDetail: async (
      root,
      data,
      { models: { OrganizerDetail, User }, ValidationError },
    ) => {
      try {
        const userIdInsert = await User.query().findById(data.user_id);
        if (!userIdInsert) {
          throw new ValidationError('user-not-exist');
        }
        const organizerDetail = await OrganizerDetail.query().insert(data);
        return organizerDetail;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError('bad-request');
      }
    },
    updateOrganizerDetail: async (
      root,
      data,
      { models: { OrganizerDetail, User }, ValidationError },
    ) => {
      try {
        if (data.user_id != null) {
          const userIdInsert = await User.query().findById(data.user_id);
          if (!userIdInsert) {
            throw new ValidationError('user-not-exist');
          }
        }
        const updateOrganizerDetail = await OrganizerDetail.query().updateAndFetchById(
          data.id,
          data,
        );
        return updateOrganizerDetail;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError('bad-request');
      }
    },
    deleteOrganizerDetail: async (
      root,
      { id },
      { models: { OrganizerDetail }, ValidationError },
    ) => {
      try {
        const organizerDetail = await OrganizerDetail.query().findById(id);
        await OrganizerDetail.query().deleteById(id);
        return organizerDetail;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError('bad-request');
      }
    },
  },
};
