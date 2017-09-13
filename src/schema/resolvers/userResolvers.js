import jwt from 'jsonwebtoken';

export default {
  User: {
    organizerDetails: async ({ id }, data, { models: { OrganizerDetail } }) => {
      const organizerDetail = await OrganizerDetail.query().where(
        'user_id',
        id,
      );
      return organizerDetail;
    },
    conferenceAttendees: async (
      { id },
      data,
      { models: { ConferenceAttendee } },
    ) => {
      const conferenceAttendees = await ConferenceAttendee.query().where(
        'user_id',
        id,
      );
      return conferenceAttendees;
    },
    news: async ({ id }, data, { models: { News } }) => {
      const news = await News.query().where('user_id', id);
      return news;
    },
    newsPhotos: async ({ id }, data, { models: { NewsPhoto } }) => {
      const newsPhotos = await NewsPhoto.query().where('news_id', id);
      return newsPhotos;
    },
    newsLikes: async ({ id }, data, { models: { NewsLike } }) => {
      const newsPhotos = await NewsLike.query().where('news_id', id);
      return newsPhotos;
    },
    newsComments: async ({ id }, data, { models: { NewsComment } }) => {
      const newsComments = await NewsComment.query().where('news_id', id);
      return newsComments;
    },
  },
  Query: {
    getAllUsers: async (root, data, { models: { User }, ValidationError }) => {
      try {
        const users = await User.query();
        return users;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError('bad-request');
      }
    },
    getUserByID: async (
      root,
      { userId },
      { models: { User }, ValidationError },
    ) => {
      try {
        const user = await User.query().findById(userId);
        if (!user) {
          throw new ValidationError('user-not-found');
        }
        return user;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        if (e.message === 'user-not-found') {
          throw new ValidationError('user-not-found');
        }
        throw new ValidationError('bad-request');
      }
    },
    me: (root, data, { ValidationError, user }) => {
      if (!user) {
        throw new ValidationError('unauthorized');
      }
      return user;
    },
  },
  Mutation: {
    register: async (
      root,
      data,
      { models: { User }, ValidationError, user },
    ) => {
      if (user) {
        throw new ValidationError('still-logging-in');
      }
      Object.assign(data, data, {
        gender: 'unknown',
      });
      try {
        const newUser = await User.query().insert(data);
        return newUser;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        if (e.code === '23505') {
          throw new ValidationError('email-existed', 'email');
        }
        throw new ValidationError('bad-request');
      }
    },
    login: async (
      root,
      { email, password },
      { models: { User }, ValidationError, user, config },
    ) => {
      if (user) {
        throw new ValidationError('still-logging-in');
      }

      const authUser = await User.query().findOne({ email });
      if (!authUser) {
        throw new ValidationError('bad-credentials');
      }
      const isPasswordMatch = await authUser.checkPassword(password);
      if (!isPasswordMatch) {
        throw new ValidationError('bad-credentials');
      }

      const tokenPayload = {
        id: authUser.id,
        versionKey: authUser.version_key,
      };
      const token = jwt.sign(tokenPayload, config.jwtSecret, {
        expiresIn: '15m',
      });
      const refreshToken = jwt.sign(tokenPayload, config.jwtRefreshSecret, {
        expiresIn: '7d',
      });
      return {
        token,
        refreshToken,
      };
    },
    updateMe: async (root, data, { ValidationError, user }) => {
      if (!user) {
        throw new ValidationError('unauthorized');
      }
      try {
        const updatedUser = await user
          .$query()
          .findById(user.id)
          .patchAndFetch(data);
        return updatedUser;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError('bad-request');
      }
    },
    updatePassword: async (
      root,
      { oldPassword, newPassword },
      { ValidationError, user },
    ) => {
      if (!user) {
        throw new ValidationError('unauthorized');
      }

      const oldPasswordMatch = await user.checkPassword(oldPassword);
      if (!oldPasswordMatch) {
        throw new ValidationError('wrong-password');
      }

      const newPasswordSameOldPassword = await user.checkPassword(newPassword);
      if (newPasswordSameOldPassword) {
        throw new ValidationError('input-old-password');
      }
      try {
        const updatedUser = await user
          .$query()
          .patchAndFetch({ password: newPassword });
        return updatedUser;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError('bad-request', 'password');
      }
    },
    sendForgotPasswordEmail: async (
      root,
      { email },
      {
        models: { User },
        ValidationError,
        config,
        transporter,
        emailTemplates,
      },
    ) => {
      const user = await User.query().findOne({ email });
      if (!user) {
        throw new ValidationError('user-not-found', 'email');
      }
      const payload = {
        id: user.id,
        versionKey: user.version_key,
      };

      const token = jwt.sign(payload, config.jwtForgotPasswordSecret, {
        expiresIn: '24h',
      });
      const template = emailTemplates.forgotPasswordTemplate(
        config.swEmail,
        user.email,
        null,
        token,
      );
      transporter.sendMail(template);

      return {
        success: true,
        message: 'email-sent',
      };
    },
    checkForgotPasswordToken: async (
      root,
      { token },
      { ValidationError, models: { User }, config },
    ) => {
      const { id, versionKey } = jwt.verify(
        token,
        config.jwtForgotPasswordSecret,
      );
      if (!id || !versionKey) {
        throw new ValidationError('invalid-token', 'token');
      }
      const userToCheck = await User.query().findOne({ id });
      if (!userToCheck) {
        throw new ValidationError('invalid-token', 'token');
      }
      const isVersionKeyMatch = userToCheck.version_key === versionKey;
      if (!isVersionKeyMatch) {
        throw new ValidationError('invalid-token', 'token');
      }
      return {
        success: true,
        message: 'token-valid',
      };
    },
    resetUserPassword: async (
      root,
      { token, newPassword },
      { models: { User }, ValidationError, config },
    ) => {
      const { id, versionKey } = jwt.verify(
        token,
        config.jwtForgotPasswordSecret,
      );
      if (!id || !versionKey) {
        throw new ValidationError('invalid-token', 'token');
      }
      const userToCheck = await User.query().findOne({ id });
      if (!userToCheck) {
        throw new ValidationError('invalid-token', 'token');
      }
      const isVersionKeyMatch = userToCheck.version_key === versionKey;
      if (!isVersionKeyMatch) {
        throw new ValidationError('invalid-token', 'token');
      }

      await userToCheck.$query().patch({ password: newPassword });

      return {
        success: true,
        message: 'token-valid',
      };
    },
  },
};
