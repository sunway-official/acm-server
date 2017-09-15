export default {
  Topic: {
    conferenceTopics: async ({ id }, data, { models: { ConferenceTopic } }) => {
      const conferenceTopic = await ConferenceTopic.query().where(
        'topic_id',
        id,
      );
      return conferenceTopic;
    },
    activityTopics: async ({ id }, data, { models: { ActivityTopic } }) => {
      const activityTopics = await ActivityTopic.query().where('topic_id', id);
      return activityTopics;
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
      { models: { Topic, ConferenceTopic }, ValidationError },
    ) => {
      try {
        // delete ConferenceTopic with topic_id
        const confTopicWithTopicId = ConferenceTopic.query().where(
          'topic_id',
          id,
        );
        if (confTopicWithTopicId) {
          await ConferenceTopic.query()
            .delete()
            .where('topic_id', id);
        }
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
