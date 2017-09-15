export default {
  Question: {
    activity: async ({ activity_id }, data, { models: { Activity } }) => {
      const activity = await Activity.query().findById(activity_id);
      return activity;
    },
    user: async ({ user_id }, data, { models: { User } }) => {
      const user = await User.query().findById(user_id);
      return user;
    },
  },
  Query: {
    getAllQuestions: async (
      root,
      data,
      { models: { Question }, ValidationError },
    ) => {
      try {
        const question = await Question.query();
        return question;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError('bad-request');
      }
    },
    getQuestionByID: async (
      root,
      { id },
      { models: { Question }, ValidationError },
    ) => {
      try {
        const question = await Question.query().findById(id);
        if (!question) {
          throw new ValidationError('question-not-found');
        }
        return question;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        if (e.message === 'question-not-found') {
          throw new ValidationError('question-not-found');
        }
        throw new ValidationError('bad-request');
      }
    },
    getQuestionByActivityID: async (
      root,
      { activity_id },
      { models: { Question }, ValidationError },
    ) => {
      try {
        const question = await Question.query().where(
          'activity_id',
          activity_id,
        );
        if (!question) {
          throw new ValidationError('question-not-found');
        }
        return question;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        if (e.message === 'question-not-found') {
          throw new ValidationError('question-not-found');
        }
        throw new ValidationError(e);
      }
    },
    getQuestionByUserID: async (
      root,
      { user_id },
      { models: { Question }, ValidationError },
    ) => {
      try {
        const question = await Question.query().where('user_id', user_id);
        if (!question) {
          throw new ValidationError('question-not-found');
        }
        return question;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        if (e.message === 'question-not-found') {
          throw new ValidationError('question-not-found');
        }
        throw new ValidationError('bad-request');
      }
    },
  },
  Mutation: {
    insertQuestion: async (
      root,
      data,
      { models: { Question }, ValidationError },
    ) => {
      try {
        const questionInsert = await Question.query().insert(data);
        return questionInsert;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError('bad-request');
      }
    },
    updateQuestion: async (
      root,
      data,
      { models: { Question }, ValidationError },
    ) => {
      try {
        const updateQuestion = await Question.query().updateAndFetchById(
          data.id,
          data,
        );
        return updateQuestion;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError('bad-request');
      }
    },
    deleteQuestion: async (
      root,
      { id },
      { models: { Question }, ValidationError },
    ) => {
      try {
        const deleteQuestion = await Question.query().findById(id);
        await Question.query().deleteById(id);
        return deleteQuestion;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError('bad-request');
      }
    },
  },
};
