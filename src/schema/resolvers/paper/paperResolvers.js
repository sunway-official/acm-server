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
      if (paperTopic.length > 0) {
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
      const paperAuthors = await PaperAuthor.query().where(builder =>
        builder.where('conference_id', conference_id).where('paper_id', id),
      );
      return paperAuthors;
    },
    comments: async (
      { id, conference_id },
      data,
      { models: { PaperReviewQuestionPoint }, user },
    ) => {
      const paperReview = await PaperReviewQuestionPoint.query().where(
        builder =>
          builder
            .where('conference_id', conference_id)
            .where('paper_id', id)
            .where('user_id', user.id),
      );
      return paperReview;
    },
    is_reviewed: async (
      { id },
      data,
      { models: { PaperReviewQuestionPoint }, user },
    ) => {
      const conference_id = user.current_conference_id;
      const isReviewed = await PaperReviewQuestionPoint.query().where(builder =>
        builder
          .where('conference_id', conference_id)
          .where('user_id', user.id)
          .where('paper_id', id),
      );
      return isReviewed.length ? 1 : 0;
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
    getCurrentPaper: async (
      root,
      data,
      { models: { Paper }, ValidationError, user },
    ) => {
      if (!user) {
        throw new ValidationError('unauthorized');
      }
      if (user.current_conference_id === 0) {
        throw new ValidationError('no-current-conference');
      }
      try {
        const papers = await Paper.query()
          .innerJoin('papers_authors', 'papers.id', 'papers_authors.paper_id')
          .innerJoin(
            'papers_reviewers',
            'papers.id',
            'papers_reviewers.paper_id',
          )
          .whereRaw(
            `papers_authors.user_id = ${user.id}` +
              ' OR ' +
              `papers_reviewers.user_id = ${user.id}`,
          )
          .andWhere('papers.conference_id', user.current_conference_id);
        if (!papers.length) {
          throw new Error('no-current-paper');
        }
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
    updateAllStatusPapers: async (
      root,
      { current_date },
      { models: { Paper, Conference }, ValidationError, user },
    ) => {
      try {
        if (!user) {
          throw new ValidationError('unauthorized');
        }

        // eslint-disable-next-line
        const conference_id = user.current_conference_id;
        const conference = await Conference.query().findById(conference_id);
        const paperStatus = commonUtils.allStatus();
        console.log(
          'current_date',
          current_date.getTime() >= conference.dl_re_submit_paper.getTime(),
        );
        switch (true) {
          // paper
          case current_date.getTime() >=
            conference.dl_re_submit_paper.getTime(): {
            await Paper.query()
              .update({
                paper_status_id: paperStatus['Re-reviewing'],
              })
              .where(builder =>
                builder
                  .where('conference_id', conference_id)
                  .where('paper_status_id', paperStatus['Re-submitting']),
              );
            break;
          }
          case current_date.getTime() >= conference.dl_review_paper.getTime() ||
            current_date.getTime() >= conference.dl_re_review_paper.getTime(): {
            await Paper.query()
              .update({
                paper_status_id: paperStatus.Reviewed,
              })
              .where('conference_id', conference_id);
            break;
          }
          case current_date.getTime() >= conference.dl_submit_paper.getTime(): {
            await Paper.query()
              .update({
                paper_status_id: paperStatus.Reviewing,
              })
              .where('conference_id', conference_id);
            break;
          }
          // abstract
          case current_date.getTime() >=
            conference.dl_re_submit_abstract.getTime(): {
            await Paper.query()
              .update({
                paper_status_id: paperStatus['Re-reviewing'],
              })
              .where(builder =>
                builder
                  .where('conference_id', conference_id)
                  .where('paper_status_id', paperStatus['Re-submitting']),
              );
            break;
          }
          case current_date.getTime() >=
            conference.dl_review_abstract.getTime() ||
            current_date.getTime() >=
              conference.dl_re_review_abstract.getTime(): {
            await Paper.query()
              .update({
                paper_status_id: paperStatus.Reviewed,
              })
              .where('conference_id', conference_id);
            break;
          }
          case current_date.getTime() >=
            conference.dl_submit_abstract.getTime(): {
            await Paper.query()
              .update({
                paper_status_id: paperStatus.Assigning,
              })
              .where('conference_id', conference_id);
            break;
          }

          default: {
            break;
          }
        }

        return {
          status: 1,
        };
      } catch (e) {
        console.error(e);
        throw new ValidationError(e);
      }
    },

    insertPaper: async (
      root,
      data,
      {
        models: { Paper, Conference },
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
        const conference = await Conference.query().findById(conference_id);
        // eslint-disable-next-line
        data.conference_id = conference_id;
        // eslint-disable-next-line
        const newPaper = await Paper.query().insert(data);

        // send email to author
        const template = emailTemplates.submitPaper(
          config.swEmail,
          user.email,
          {
            user,
            conference,
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
