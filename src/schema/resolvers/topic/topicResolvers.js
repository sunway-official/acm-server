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
    getTopicsOfConference: async (
      root,
      data,
      { models: { Topic }, ValidationError, user },
    ) => {
      try {
        // eslint-disable-next-line
        if (!user) {
          throw new ValidationError('unauthorized');
        }
        const topics = await Topic.query().where(
          'conference_id',
          user.current_conference_id,
        );
        return topics;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
  },
  Mutation: {
    insertTopicInConference: async (
      root,
      data,
      { models: { Topic }, ValidationError, user },
    ) => {
      try {
        // eslint-disable-next-line
        if (!user) {
          throw new ValidationError('unauthorized');
        }
        // eslint-disable-next-line
        data.conference_id = user.current_conference_id;
        if (data.name) {
          const topic = await Topic.query().where(builder => {
            builder
              .where('name', data.name)
              .where('conference_id', data.conference_id);
          });
          if (topic.length > 0)
            throw new ValidationError("Topic's name is exists !");
        }

        const newTopic = await Topic.query().insert(data);
        return newTopic;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
    updateTopicInConference: async (
      root,
      { id, name, description, color_id },
      { models: { Topic }, ValidationError, user },
    ) => {
      try {
        if (!user) {
          throw new ValidationError('unauthorized');
        }
        // eslint-disable-next-line
        const conference_id = user.current_conference_id;
        // check topic's name exists
        if (name) {
          const topic = await Topic.query().where(builder => {
            builder
              .where('name', name)
              .where('conference_id', 1)
              .whereNot('id', id);
          });
          if (topic.length > 0)
            throw new ValidationError("Topic's name is exists !");
        }

        const updateTopic = await Topic.query().updateAndFetchById(id, {
          name,
          description,
          color_id,
        });

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
