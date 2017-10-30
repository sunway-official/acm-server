import jwt from 'jsonwebtoken';
import pubsub from '../../pubsub';

export default {
  User: {
    permissions: async ({ id }, data, { models: { Permission } }) => {
      const permissions = Permission.query().where('user_id', id);
      return permissions;
    },
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
    activityFeedback: async (
      { id },
      data,
      { models: { ActivityFeedback } },
    ) => {
      const activityFeedback = await ActivityFeedback.query().where(
        'user_id',
        id,
      );
      return activityFeedback;
    },
    conferences: async ({ id }, data, { models: { Conference } }) => {
      const conferences = await Conference.query().where('user_id', id);
      return conferences;
    },
    news: async ({ id }, data, { models: { News } }) => {
      const news = await News.query().where('user_id', id);
      return news;
    },
    newsPhotos: async ({ id }, data, { models: { NewsPhoto } }) => {
      const newsPhotos = await NewsPhoto.query().where('user_id', id);
      return newsPhotos;
    },
    newsLikes: async ({ id }, data, { models: { NewsLike } }) => {
      const newsLikes = await NewsLike.query().where('user_id', id);
      return newsLikes;
    },
    newsComments: async ({ id }, data, { models: { NewsComment } }) => {
      const newsComments = await NewsComment.query().where('user_id', id);
      return newsComments;
    },
    questions: async ({ id }, data, { models: { Question } }) => {
      const questions = await Question.query().where('user_id', id);
      return questions;
    },
    answers: async ({ id }, data, { models: { Answer } }) => {
      const answers = await Answer.query().where('user_id', id);
      return answers;
    },
    address: async ({ address_id }, data, { models: { Address } }) => {
      const address = Address.query().findById(address_id);
      return address;
    },
  },
  Subscription: {
    Me: {
      subscribe: () => pubsub.asyncIterator('Me'),
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
        throw new ValidationError('user-not-exists');
      }
      const isPasswordMatch = await authUser.checkPassword(password);
      if (!isPasswordMatch) {
        throw new ValidationError('wrong-email-or-password');
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
    updateAvatar: async (root, { avatarUrl }, { ValidationError, user }) => {
      if (!user) {
        throw new ValidationError('unauthorized');
      }
      try {
        const updatedUser = await user
          .$query()
          .findById(user.id)
          .patchAndFetch({
            avatar: avatarUrl,
          });

        pubsub.publish('Me', {
          Me: updatedUser,
        });
        return updatedUser;
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        throw new ValidationError('bad-request');
      }
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

        pubsub.publish('Me', {
          Me: updatedUser,
        });

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

    deleteUser: async (root, { id }, { models: { User }, ValidationError }) => {
      try {
        const user = await User.query().findById(id);

        if (!user) throw new ValidationError('User not exist');

        // delete all permission of user with id
        // delete all personal schedule of user with id
        // delete all conferences of user with id
        // delete all organizer detail schedule of user with id
        // delete all conference attendee schedule of user with id
        // delete all feedback of user with id
        // delete all question of user with id
        // delete all answers of user with id
        // delete all news of user with id
        // delete all news commnent of user with id
        // delete all news like of user with id

        await user.deleteAllRelationship();

        // delete user
        await User.query().deleteById(id);

        return user;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
  },
};
