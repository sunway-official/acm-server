export default {
  ActivityTopic: {
    activity: async ({ activity_id }, data, { models: { Activity } }) => {
      const activity = await Activity.query().findById(activity_id);
      return activity;
    },
    topic: async ({ topic_id }, data, { models: { Topic } }) => {
      const topic = await Topic.query().findById(topic_id);
      return topic;
    },
  },

  Query: {
    getAllActivityTopics: async (
      root,
      data,
      { models: { ActivityTopic }, ValidationError },
    ) => {
      try {
        const activityTopics = await ActivityTopic.query();
        return activityTopics;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
    getActivityTopicByID: async (
      root,
      { id },
      { models: { ActivityTopic }, ValidationError },
    ) => {
      try {
        const activityTopic = await ActivityTopic.query().findById(id);
        return activityTopic;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
  },

  Mutation: {
    insertActivityTopic: async (
      root,
      data,
      { models: { ActivityTopic }, ValidationError },
    ) => {
      try {
        const newActivityTopic = await ActivityTopic.query().insert(data);
        return newActivityTopic;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },

    updateActivityTopic: async (
      root,
      data,
      { models: { ActivityTopic }, ValidationError },
    ) => {
      try {
        const updateActivityTopic = await ActivityTopic.query().updateAndFetchById(
          data.id,
          data,
        );
        return updateActivityTopic;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
    deleteActivityTopic: async (
      root,
      { id },
      { models: { ActivityTopic }, ValidationError },
    ) => {
      try {
        const activityTopic = await ActivityTopic.query().findById(id);
        if (!activityTopic)
          throw new ValidationError('Not found ActivityTopic');
        await ActivityTopic.query().deleteById(id);
        return activityTopic;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
  },
};
