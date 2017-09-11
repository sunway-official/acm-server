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
        throw new ValidationError('bad-request');
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
        throw new ValidationError('bad-request');
      }
    },
    getConferenceTopicByConfID: async (
      root,
      { conference_id },
      { models: { ConferenceTopic }, ValidationError },
    ) => {
      try {
        const conferenceTopic = await ConferenceTopic.query().where(
          'conference_id',
          conference_id,
        );
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
    getConferenceTopicByTopicID: async (
      root,
      { topic_id },
      { models: { ConferenceTopic }, ValidationError },
    ) => {
      try {
        const conferenceTopic = await ConferenceTopic.query().where(
          'topic_id',
          topic_id,
        );
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
        throw new ValidationError('bad-request');
      }
    },
    getConferenceTopicByTopicIDConfID: async (
      root,
      { topic_id, conference_id },
      { models: { ConferenceTopic }, ValidationError },
    ) => {
      try {
        const conferenceTopic = await ConferenceTopic.query()
          .where('topic_id', topic_id)
          .where('conference_id', conference_id);
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
        throw new ValidationError('bad-request');
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
        throw new ValidationError('bad-request');
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
        throw new ValidationError('bad-request');
      }
    },
    deleteConferenceTopic: async (
      root,
      { id },
      { models: { ConferenceTopic }, ValidationError },
    ) => {
      try {
        const conferenceTopic = await ConferenceTopic.query().findById(id);
        await ConferenceTopic.query().deleteById(id);
        return conferenceTopic;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError('bad-request');
      }
    },
  },
};
