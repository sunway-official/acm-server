export default {
  Answer: {
    question: async ({ question_id }, data, { models: { Question } }) => {
      const question = await Question.query().findById(question_id);
      return question;
    },
    user: async ({ user_id }, data, { models: { User } }) => {
      const user = await User.query().findById(user_id);
      return user;
    },
  },
  Query: {
    getAllAnswers: async (
      root,
      data,
      { models: { Answer }, ValidationError },
    ) => {
      try {
        const answer = await Answer.query();
        return answer;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError('bad-request');
      }
    },
    getAnswerByID: async (
      root,
      { id },
      { models: { Answer }, ValidationError },
    ) => {
      try {
        const answer = await Answer.query().findById(id);
        if (!answer) {
          throw new ValidationError('answer-not-found');
        }
        return answer;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        if (e.message === 'answer-not-found') {
          throw new ValidationError('answer-not-found');
        }
        throw new ValidationError('bad-request');
      }
    },
    getAnswerByQuestionID: async (
      root,
      { question_id },
      { models: { Answer }, ValidationError },
    ) => {
      try {
        const answer = await Answer.query().where('question_id', question_id);
        if (!answer) {
          throw new ValidationError('answer-not-found');
        }
        return answer;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        if (e.message === 'answer-not-found') {
          throw new ValidationError('answer-not-found');
        }
        throw new ValidationError(e);
      }
    },
    getAnswerByUserID: async (
      root,
      { user_id },
      { models: { Answer }, ValidationError },
    ) => {
      try {
        const answer = await Answer.query().where('user_id', user_id);
        if (!answer) {
          throw new ValidationError('answer-not-found');
        }
        return answer;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        if (e.message === 'answer-not-found') {
          throw new ValidationError('answer-not-found');
        }
        throw new ValidationError('bad-request');
      }
    },
  },
  Mutation: {
    insertAnswer: async (
      root,
      data,
      { models: { Answer }, ValidationError },
    ) => {
      try {
        const answerInsert = await Answer.query().insert(data);
        return answerInsert;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError('bad-request');
      }
    },
    updateAnswer: async (
      root,
      data,
      { models: { Answer }, ValidationError },
    ) => {
      try {
        const updateAnswer = await Answer.query().updateAndFetchById(
          data.id,
          data,
        );
        return updateAnswer;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError('bad-request');
      }
    },
    deleteAnswer: async (
      root,
      { id },
      { models: { Answer }, ValidationError },
    ) => {
      try {
        const deleteAnswer = await Answer.query().findById(id);
        await Answer.query().deleteById(id);
        return deleteAnswer;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError('bad-request');
      }
    },
  },
};
