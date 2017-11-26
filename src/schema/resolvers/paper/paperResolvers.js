export default {
  Paper: {
    user: async ({ user_id }, data, { models: { User } }) => {
      const user = await User.query().findById(user_id);
      return user;
    },
    conference: async ({ conference_id }, data, { models: { Conference } }) => {
      const conference = await Conference.query().findById(conference_id);
      return conference;
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
        const user_id = user.id;
        // eslint-disable-next-line
        data.conference_id = conference_id;
        // eslint-disable-next-line
        data.user_id = user_id;
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
          const paper = await Paper.query().where('title', data.title);
          if (paper) throw new ValidationError("Paper's title is exists !");
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
      { models: { Paper }, ValidationError },
    ) => {
      try {
        const paper = await Paper.query().findById(id);

        // delete Schedule By PaperID
        // await paper.deleteSchedule();

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
