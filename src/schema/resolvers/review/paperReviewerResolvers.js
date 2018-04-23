import commonUtils from '../../../utils/common';

export default {
  PaperReviewer: {
    user: async ({ user_id }, data, { models: { User } }) => {
      const user = await User.query().findById(user_id);
      return user;
    },
    paper: async ({ paper_id }, data, { models: { Paper } }) => {
      const paper = await Paper.query().findById(paper_id);
      return paper;
    },
  },

  Query: {},

  Mutation: {
    insertPaperReviewer: async (
      root,
      data,
      {
        models: { PaperReviewer, Conference, User, Paper },
        ValidationError,
        user,
        emailTemplates,
        transporter,
        config,
      },
    ) => {
      if (!user) {
        throw new ValidationError('unauthorized');
      }
      const conference_id = user.current_conference_id;
      const conference = await Conference.query().findById(conference_id);
      const paperReviewerData = data;
      const reviewer = await User.query().findById(data.user_id);
      const paperStatus = commonUtils.allStatus();

      // update status
      await Paper.query().update({ paper_status_id: paperStatus.Reviewing });
      paperReviewerData.conference_id = conference_id;
      const paperReviewer = await PaperReviewer.query().insert(
        paperReviewerData,
      );

      // send email to author
      const template = emailTemplates.assignPaper(
        config.swEmail,
        reviewer.email,
        {
          reviewer,
          conference,
        },
      );
      commonUtils.sendMail(user, template, transporter);

      return paperReviewer;
    },
  },
};
