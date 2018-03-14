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
    getAllPapersByTopicID: async (
      root,
      { topic_id },
      { models: { PaperTopic }, ValidationError },
    ) => {
      try {
        const papers = await PaperTopic.query().where('topic_id', topic_id);
        return papers;
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
        await PaperTopic.query()
          .update({ topic_id })
          .where('paper_id', paper_id);

        const paper = await PaperTopic.query().where('paper_id', paper_id);
        return paper[0];
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
        return {
          topic_id: paperTopic[0].topic_id,
        };
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
  },
};
