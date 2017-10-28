export default {
  ActivityFeedback: {
    activity: async ({ activity_id }, data, { models: { Activity } }) => {
      const activity = await Activity.query().findById(activity_id);
      return activity;
    },
    user: async ({ user_id }, data, { models: { User } }) => {
      const user = await User.query().findById(user_id);
      return user;
    },
  },

  Query: {
    getAllActivityFeedback: async (
      root,
      data,
      { models: { ActivityFeedback }, ValidationError, user },
    ) => {
      try {
        if (!user) {
          throw new ValidationError('unauthorized');
        }
        const activityFeedback = await ActivityFeedback.query();
        return activityFeedback;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
    getActivityFeedbackByID: async (
      root,
      { id },
      { models: { ActivityFeedback }, ValidationError, user },
    ) => {
      try {
        if (!user) {
          throw new ValidationError('unauthorized');
        }
        const activityFeedback = await ActivityFeedback.query().findById(id);
        return activityFeedback;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);

        throw new ValidationError(e);
      }
    },

    getAllActivityFeedbackByUserID: async (
      root,
      { user_id },
      { models: { ActivityFeedback }, ValidationError, user },
    ) => {
      try {
        if (!user) {
          throw new ValidationError('unauthorized');
        }
        const allFeedbackOfUser = await ActivityFeedback.query().where(
          'user_id',
          user_id,
        );
        return allFeedbackOfUser;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);

        throw new ValidationError(e);
      }
    },

    getAllActivityFeedbackByActivityID: async (
      root,
      { activity_id },
      { models: { ActivityFeedback }, ValidationError, user },
    ) => {
      try {
        if (!user) {
          throw new ValidationError('unauthorized');
        }
        const allFeedbackOfActivity = await ActivityFeedback.query().where(
          'activity_id',
          activity_id,
        );
        return allFeedbackOfActivity;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },

    getAllActivityFeedbackByActivityIDUserID: async (
      root,
      { activity_id, user_id },
      { models: { ActivityFeedback }, ValidationError, user },
    ) => {
      try {
        if (!user) {
          throw new ValidationError('unauthorized');
        }
        const feedbackWithActivityIDUserID = await ActivityFeedback.query().where(
          builder => {
            builder.where('activity_id', activity_id).where('user_id', user_id);
          },
        );
        return feedbackWithActivityIDUserID;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
  },

  Mutation: {
    insertActivityFeedback: async (
      root,
      data,
      { models: { ActivityFeedback }, ValidationError, user },
    ) => {
      try {
        if (!user) {
          throw new ValidationError('unauthorized');
        }
        const newActivityFeedback = await ActivityFeedback.query().insert(data);
        return newActivityFeedback;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },

    updateActivityFeedback: async (
      root,
      data,
      { models: { ActivityFeedback }, ValidationError, user },
    ) => {
      try {
        if (!user) {
          throw new ValidationError('unauthorized');
        }
        const updateActivityFeedback = await ActivityFeedback.query().updateAndFetchById(
          data.id,
          data,
        );
        return updateActivityFeedback;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
    deleteActivityFeedback: async (
      root,
      { id },
      { models: { ActivityFeedback }, ValidationError, user },
    ) => {
      try {
        if (!user) {
          throw new ValidationError('unauthorized');
        }
        const activityFeedback = await ActivityFeedback.query().findById(id);
        if (!activityFeedback)
          throw new ValidationError('Not found ActivityFeedback');
        await ActivityFeedback.query().deleteById(id);
        return activityFeedback;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
  },
};
