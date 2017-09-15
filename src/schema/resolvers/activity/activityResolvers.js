export default {
  Activity: {
    activityType: async (
      { activity_type_id },
      data,
      { models: { ActivityType } },
    ) => {
      const activityType = await ActivityType.query().findById(
        activity_type_id,
      );
      return activityType;
    },
    conference: async ({ conference_id }, data, { models: { Conference } }) => {
      const conference = await Conference.query().findById(conference_id);
      return conference;
    },

    activityTopics: async ({ id }, data, { models: { ActivityTopic } }) => {
      const activityTopic = ActivityTopic.query().where('activity_id', id);
      return activityTopic;
    },
    activityFeedback: async (
      { id },
      data,
      { models: { ActivityFeedback } },
    ) => {
      const activityFeedback = ActivityFeedback.query().where(
        'activity_id',
        id,
      );
      return activityFeedback;
    },
  },

  Query: {
    getAllActivities: async (
      root,
      data,
      { models: { Activity }, ValidationError },
    ) => {
      try {
        const activities = await Activity.query();
        return activities;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
    getActivityByID: async (
      root,
      { id },
      { models: { Activity }, ValidationError },
    ) => {
      try {
        const activity = await Activity.query().findById(id);
        return activity;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },

    getActivitiesByConferenceID: async (
      root,
      { conference_id },
      { models: { Activity }, ValidationError },
    ) => {
      try {
        const allActivitiesOfConference = await Activity.query().where(
          'conference_id',
          conference_id,
        );
        return allActivitiesOfConference;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);

        throw new ValidationError(e);
      }
    },
  },

  Mutation: {
    insertActivity: async (
      root,
      data,
      { models: { Activity }, ValidationError },
    ) => {
      try {
        const newActivity = await Activity.query().insert(data);
        return newActivity;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },

    updateActivity: async (
      root,
      data,
      { models: { Activity }, ValidationError },
    ) => {
      try {
        const updateActivity = await Activity.query().updateAndFetchById(
          data.id,
          data,
        );
        return updateActivity;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
    deleteActivity: async (
      root,
      { id },
      { models: { Activity }, ValidationError },
    ) => {
      try {
        const activity = await Activity.query().findById(id);

        // // delete all feedback of activity with id

        // // delete all schedules of activity with id

        // // delete all topic of activity with id

        //  // delete all question of activity with id
        await activity.deleteAllRelationship();

        if (!activity) throw new ValidationError('Not found Activity');

        // delete activity
        await Activity.query().deleteById(id);
        return activity;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
  },
};
