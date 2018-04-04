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
        models: { PaperReviewer, Conference },
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
      paperReviewerData.conference_id = conference_id;
      const paperReviewer = await PaperReviewer.query().insert(
        paperReviewerData,
      );

      // send email to author
      const subject = `${conference.title}`;
      const template = emailTemplates.submitPaper(
        config.swEmail,
        user.email,
        subject,
        {
          user,
          conference,
        },
      );
      commonUtils.sendMail(user, template, transporter);

      return paperReviewer;
    },
  },
};
