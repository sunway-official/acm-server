import commonUtils from '../../../utils/common';

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
    topic_name: async ({ id }, data, { models: { PaperTopic } }) => {
      const paperTopic = await PaperTopic.query().where('paper_id', id);
      let topic_name = '';
      if (paperTopic) {
        // eslint-disable-next-line
        topic_name = paperTopic[0].topic_name;
      }
      return topic_name;
    },
    reviewers: async (
      { id, conference_id },
      data,
      { models: { PaperReviewer } },
    ) => {
      const paperReviewers = await PaperReviewer.query()
        .select('*')
        .where(builder =>
          builder.where('conference_id', conference_id).where('paper_id', id),
        );
      return paperReviewers;
    },
    authors: async (
      { id, conference_id },
      data,
      { models: { PaperAuthor } },
    ) => {
      const paperAuthors = await PaperAuthor.query()
        .select('*')
        .where(builder =>
          builder.where('conference_id', conference_id).where('paper_id', id),
        );
      return paperAuthors;
    },
    comments: async (
      { id, conference_id },
      data,
      { models: { PaperReviewQuestionPoint } },
    ) => {
      const paperReview = await PaperReviewQuestionPoint.query().where(
        builder =>
          builder
            .where('conference_id', conference_id)
            .where('paper_id', id)
            .where('review_question_id', 1),
      );
      return paperReview;
    },
  },
  Query: {
    getPapersByConferenceID: async (
      root,
      { conference_id, role_id },
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
        const ROLE_REVIEWER = 6;
        const ROLE_AUTHOR = 7;
        let papers = [];
        switch (parseInt(role_id, 10)) {
          // ROLE_AUTHOR
          case ROLE_AUTHOR: {
            papers = await Paper.query()
              .select('*', 'rls_authors.paper_id as id')
              .joinRelation('rls_authors')
              .where(builder =>
                builder
                  .where('rls_authors.conference_id', conference_id)
                  .where('rls_authors.user_id', user.id),
              );
            break;
          }

          // ROLE_REVIEWER
          case ROLE_REVIEWER: {
            papers = await Paper.query()
              .select('*', 'rls_reviewers.paper_id as id')
              .joinRelation('rls_reviewers')
              .where(builder =>
                builder
                  .where('rls_reviewers.conference_id', conference_id)
                  .where('rls_reviewers.user_id', user.id),
              );
            break;
          }
          default: {
            papers = await Paper.query().where(builder =>
              builder.where('conference_id', conference_id),
            );
            break;
          }
        }

        return papers;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },

    getPapersByStatusId: async (
      root,
      { paper_status_id },
      { models: { Paper }, ValidationError, user },
    ) => {
      try {
        // eslint-disable-next-line
        if (!user) {
          throw new ValidationError('unauthorized');
        }
        // eslint-disable-next-line
        const conference_id = user.current_conference_id;
        const papers = await Paper.query().where(builder =>
          builder
            .where('conference_id', conference_id)
            .where('paper_status_id', paper_status_id),
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
      {
        models: { Paper },
        ValidationError,
        user,
        emailTemplates,
        transporter,
        config,
      },
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
        const subject = 'Submited paper';
        const template = emailTemplates.submitPaper(
          config.swEmail,
          user.email,
          subject,
          {
            title: data.title,
          },
        );
        commonUtils.sendMail(user, template, transporter);
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
          .patchAndFetchById(data.id, data)
          .where('conference_id', conference_id);
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
