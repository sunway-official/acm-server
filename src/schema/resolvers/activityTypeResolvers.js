export default {
  ActivityType: {
    activities: async ({ id }, data, { models: { Activity } }) => {
      const activities = await Activity.query().where('activity_type_id', id);
      return activities;
    },
  },

  Query: {
    getAllActivityTypes: async (
      root,
      data,
      { models: { ActivityType }, ValidationError },
    ) => {
      try {
        const activityTypes = await ActivityType.query();
        return activityTypes;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
    getActivityTypeByID: async (
      root,
      { id },
      { models: { ActivityType }, ValidationError },
    ) => {
      try {
        const activityType = await ActivityType.query().findById(id);
        return activityType;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);

        throw new ValidationError(e);
      }
    },
  },

  Mutation: {
    insertActivityType: async (
      root,
      data,
      { models: { ActivityType }, ValidationError },
    ) => {
      try {
        const newActivityType = await ActivityType.query().insert(data);
        return newActivityType;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },

    updateActivityType: async (
      root,
      data,
      { models: { ActivityType }, ValidationError },
    ) => {
      try {
        const updateActivityType = await ActivityType.query().updateAndFetchById(
          data.id,
          data,
        );
        return updateActivityType;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
    deleteActivityType: async (
      root,
      { id },
      { models: { ActivityType, Activity }, ValidationError },
    ) => {
      try {
        // delete activities with activity_type_id
        const activitiesOfActivityType = Activity.query().where(
          'activity_type_id',
          id,
        );
        if (activitiesOfActivityType)
          await Activity.query()
            .delete()
            .where('activity_type_id', id);

        const activityType = await ActivityType.query().findById(id);
        if (!activityType) throw new ValidationError('Not found Activitytype');
        await ActivityType.query().deleteById(id);
        return activityType;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
  },
};
