export default {
  Topic: {
    conference: async ({ conference_id }, data, { models: { Conference } }) => {
      const conference = await Conference.query().findById(conference_id);
      return conference;
    },
    color: async ({ color_id }, data, { models: { Color } }) => {
      const color = await Color.query().findById(color_id);
      return color;
    },
  },
  Query: {
    getAllTopics: async (
      root,
      data,
      { models: { Topic }, ValidationError },
    ) => {
      try {
        const topic = await Topic.query();
        return topic;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
    getTopicByID: async (
      root,
      { id },
      { models: { Topic }, ValidationError },
    ) => {
      try {
        const topic = await Topic.query().findById(id);
        if (!topic) {
          throw new ValidationError('topic-not-found');
        }
        return topic;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
  },
  Mutation: {
    insertTopic: async (root, data, { models: { Topic }, ValidationError }) => {
      try {
        const newTopic = await Topic.query().insert(data);
        return newTopic;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
    updateTopic: async (root, data, { models: { Topic }, ValidationError }) => {
      try {
        const updateTopic = await Topic.query().updateAndFetchById(
          data.id,
          data,
        );
        return updateTopic;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
    deleteTopic: async (
      root,
      { id },
      { models: { Topic }, ValidationError },
    ) => {
      try {
        const topic = await Topic.query().findById(id);

        if (topic) {
          await topic.deleteAllRelationship();
          await Topic.query().deleteById(id);
        } else {
          throw new ValidationError('Not found topic');
        }
        return topic;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
  },
};
