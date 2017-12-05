export default {
  PaperTopic: {
    paper: async ({ paper_id }, data, { models: { Paper } }) => {
      const paper = await Paper.query().findById(paper_id);
      return paper;
    },
    topic: async ({ topic_id }, data, { models: { Topic } }) => {
      const topic = await Topic.query().findById(topic_id);
      return topic;
    },
  },

  Query: {
    getAllPapersTopics: async (
      root,
      data,
      { models: { PaperTopic }, ValidationError, user },
    ) => {
      try {
        if (!user) {
          throw new ValidationError('unauthorized');
        }
        const papersTopics = await PaperTopic.query();
        return papersTopics;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
    getTopicsByPaperID: async (
      root,
      { paper_id },
      { models: { PaperTopic }, ValidationError },
    ) => {
      try {
        const topics = await PaperTopic.query().where('paper_id', paper_id);
        return topics;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
  },

  Mutation: {
    insertPaperTopic: async (
      root,
      data,
      { models: { PaperTopic }, ValidationError },
    ) => {
      try {
        const newPaperTopic = await PaperTopic.query().insert(data);
        return newPaperTopic;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },

    updateTopicOfPaper: async (
      root,
      { paper_id, topic_id },
      { models: { PaperTopic }, ValidationError },
    ) => {
      try {
        const paper = await PaperTopic.query().where('paper_id', paper_id);

        const updateTopicOfPaper = await paper.$query().updateAndFetch({
          topic_id,
        });
        return updateTopicOfPaper;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
    deletePaperTopic: async (
      root,
      { topic_id, paper_id },
      { models: { PaperTopic }, ValidationError },
    ) => {
      try {
        const paperTopic = await PaperTopic.query().where(builder =>
          builder.where('topic_id', topic_id).where('paper_id', paper_id),
        );
        if (!paperTopic) throw new ValidationError('Not found PaperTopic');
        await PaperTopic.query()
          .delete()
          .where(builder =>
            builder.where('topic_id', topic_id).where('paper_id', paper_id),
          );
        return paperTopic[0];
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
  },
};
