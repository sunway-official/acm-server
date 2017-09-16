export default {
  ConferenceTopic: {
    conference: async ({ conference_id }, data, { models: { Conference } }) => {
      const conference = await Conference.query().findById(conference_id);
      return conference;
    },
    topic: async ({ topic_id }, data, { models: { Topic } }) => {
      const topic = await Topic.query().findById(topic_id);
      return topic;
    },
  },
  Query: {
    getAllConferenceTopics: async (
      root,
      data,
      { models: { ConferenceTopic }, ValidationError },
    ) => {
      try {
        const conferenceTopic = await ConferenceTopic.query();
        return conferenceTopic;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
    getConferenceTopicByID: async (
      root,
      { id },
      { models: { ConferenceTopic }, ValidationError },
    ) => {
      try {
        const conferenceTopic = await ConferenceTopic.query().findById(id);
        if (!conferenceTopic) {
          throw new ValidationError('conferenceTopic-not-found');
        }
        return conferenceTopic;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        if (e.message === 'conferenceTopic-not-found') {
          throw new ValidationError('conferenceTopic-not-found');
        }
        throw new ValidationError(e);
      }
    },
  },
  Mutation: {
    insertConferenceTopic: async (
      root,
      data,
      { models: { ConferenceTopic }, ValidationError },
    ) => {
      try {
        const newConferenceTopic = await ConferenceTopic.query().insert(data);
        return newConferenceTopic;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
    updateConferenceTopic: async (
      root,
      data,
      { models: { ConferenceTopic }, ValidationError },
    ) => {
      try {
        const updateConferenceTopic = await ConferenceTopic.query().updateAndFetchById(
          data.id,
          data,
        );
        return updateConferenceTopic;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
    deleteConferenceTopic: async (
      root,
      { id },
      { models: { ConferenceTopic }, ValidationError },
    ) => {
      try {
        const conferenceTopic = await ConferenceTopic.query().findById(id);

        if (!conferenceTopic)
          throw new ValidationError('Conference topic not found');

        await ConferenceTopic.query().deleteById(id);
        return conferenceTopic;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
  },
};
