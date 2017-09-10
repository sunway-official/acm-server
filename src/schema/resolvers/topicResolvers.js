export default {
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
        throw new ValidationError('bad-request');
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
        if (e.message === 'topic-not-found') {
          throw new ValidationError('topic-not-found');
        }
        throw new ValidationError('bad-request');
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
        throw new ValidationError('bad-request');
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
        throw new ValidationError('bad-request');
      }
    },
    deleteTopic: async (
      root,
      { id },
      { models: { Topic }, ValidationError },
    ) => {
      try {
        const topic = await Topic.query().findById(id);
        await Topic.query().deleteById(id);
        return topic;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError('bad-request');
      }
    },
  },
};
