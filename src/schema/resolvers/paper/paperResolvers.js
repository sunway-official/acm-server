export default {
  Paper: {
    conference: async ({ conference_id }, data, { models: { Conference } }) => {
      const conference = await Conference.query().findById(conference_id);
      return conference;
    },
    papersTopic: async ({ id }, data, { models: { PaperTopic } }) => {
      const paperTopic = await PaperTopic.query().where('paper_id', id);
      return paperTopic;
    },
  },
  Query: {
    getAllPapers: async (
      root,
      data,
      { models: { Paper }, ValidationError, user },
    ) => {
      try {
        if (!user) {
          throw new ValidationError('unauthorized');
        }
        const papers = await Paper.query();
        return papers;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
    getPapersByConferenceID: async (
      root,
      { conference_id },
      { models: { Paper }, ValidationError, user },
    ) => {
      try {
        // eslint-disable-next-line
        if (!user && !conference_id) {
          throw new ValidationError('unauthorized');
        }
        // eslint-disable-next-line
        if (!conference_id) {
          // eslint-disable-next-line
          conference_id = user.current_conference_id;
        }
        const papers = await Paper.query().where(
          'conference_id',
          conference_id,
        );

        return papers;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
    getPapersWithAuthorByConferenceID: async (
      root,
      data,
      { models: { Paper }, ValidationError, user },
    ) => {
      try {
        // eslint-disable-next-line
        if (!user && !conference_id) {
          throw new ValidationError('unauthorized');
        }
        // eslint-disable-next-line
        const conference_id = user.current_conference_id;
        const papers = await Paper.query().where(builder =>
          builder
            .where('conference_id', conference_id)
            .where('user_id', user.id),
        );
        return papers;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
    getPapersByUserID: async (
      root,
      data,
      { models: { Paper }, ValidationError, user },
    ) => {
      try {
        if (!user) {
          throw new ValidationError('unauthorized');
        }
        const papers = await Paper.query().where('user_id', user.id);
        return papers;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
    getPaperByID: async (
      root,
      { id },
      { models: { Paper }, ValidationError },
    ) => {
      try {
        const paper = await Paper.query().findById(id);
        if (!paper) {
          throw new ValidationError('Paper-not-found');
        }
        return paper;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
  },
  Mutation: {
    insertPaper: async (
      root,
      data,
      { models: { Paper }, ValidationError, user },
    ) => {
      try {
        if (!user) {
          throw new ValidationError('unauthorized');
        }
        // eslint-disable-next-line
        const conference_id = user.current_conference_id;

        // eslint-disable-next-line
        data.conference_id = conference_id;
        // eslint-disable-next-line
        const newPaper = await Paper.query().insert(data);
        return newPaper;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
    updatePaper: async (
      root,
      data,
      { models: { Paper }, ValidationError, user },
    ) => {
      try {
        if (!user) {
          throw new ValidationError('unauthorized');
        }
        // eslint-disable-next-line
        const conference_id = user.current_conference_id;
        // eslint-disable-next-line
        if (data.title) {
          const paper = await Paper.query().where(builder =>
            builder.where('title', data.title).whereNot('id', data.id),
          );
          if (paper.length !== 0)
            throw new ValidationError("Paper's title is exists !");
        }
        const updatePaper = await Paper.query()
          .updateAndFetchById(data.id, data)
          .where(builder => {
            builder.where('conference_id', conference_id);
          });
        if (!updatePaper) {
          throw new ValidationError("Paper's not found in conference");
        }
        return updatePaper;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
    deletePaper: async (
      root,
      { id },
      { models: { Paper, Activity }, ValidationError, user },
    ) => {
      try {
        if (!user) {
          throw new ValidationError('unauthorized');
        }
        const paper = await Paper.query().findById(id);

        const activities = await Activity.query().where('paper_id', id);

        if (activities.length > 0) {
          throw new ValidationError('This paper is chosen !');
        }

        // delete Schedule By PaperID
        await paper.deleteAllRelationship();

        // delete paper
        if (paper) {
          await Paper.query().deleteById(id);
        }
        return paper;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
  },
};
