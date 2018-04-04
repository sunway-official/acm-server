import Expo from 'expo-server-sdk';

import handlePushNotification from '../../../services/handlePushNotification';

export default {
  Notification: {
    sender: async ({ sender_id }, data, { models: { User } }) => {
      const user = await User.query().findById(sender_id);
      return user;
    },
    receiver: async ({ receiver_id }, data, { models: { User } }) => {
      const user = await User.query().findById(receiver_id);
      return user;
    },
  },
  Query: {
    getNotifications: async (
      root,
      data,
      { models: { Notification }, ValidationError, user },
    ) => {
      if (!user) {
        throw new ValidationError('unauthorized');
      }

      try {
        const notifications = await Notification.query().where(
          'receiver_id',
          user.id,
        );
        return notifications;
      } catch (error) {
        throw new ValidationError(error);
      }
    },
  },
  Mutation: {
    testNotification: async (
      root,
      { from, to, title, content },
      { models: { Notification, User }, ValidationError, expo },
    ) => {
      try {
        const sender = await User.query().findOne({ email: from });
        const receiver = await User.query().findOne({ email: to });

        const data = {
          sender_id: sender.id,
          receiver_id: receiver.id,
          title,
          content,
        };

        console.log(data);

        const savedNotification = await Notification.query().insert(data);

        if (
          receiver.notification_key &&
          Expo.isExpoPushToken(receiver.notification_key)
        ) {
          await handlePushNotification(expo, {
            to: receiver.notification_key,
            sound: 'default',
            body: content,
            data: { title, content },
          });
        }

        return savedNotification;
      } catch (error) {
        throw new ValidationError(error);
      }
    },
    insertNotification: async (
      root,
      { to, content, title },
      { models: { Notification, User }, ValidationError, user, expo },
    ) => {
      if (!user) {
        throw new ValidationError('unauthorized');
      }

      try {
        const destinationUser = await User.query().findOne({ email: to });

        if (!destinationUser) {
          throw new ValidationError('invalid-destination-user');
        }

        const notification = await Notification.query().insert({
          sender_id: user.id,
          receiver_id: destinationUser.id,
          content,
          title,
        });

        if (
          destinationUser.notification_key &&
          Expo.isExpoPushToken(destinationUser.notification_key)
        ) {
          await handlePushNotification(expo, {
            to: destinationUser.notification_key,
            sound: 'default',
            body: content,
            data: { title, content },
          });
        }

        return notification;
      } catch (error) {
        throw new ValidationError(error);
      }
    },
    setNotificationRead: async (
      root,
      { id },
      { models: { Notification }, ValidationError, user },
    ) => {
      if (!user) {
        throw new ValidationError('unauthorized');
      }

      try {
        const notification = await Notification.query().findById(id);

        console.log(user.id, notification);

        if (user.id !== notification.sender_id) {
          throw new ValidationError('not-author');
        }

        const updatedNotification = await notification.$query().patchAndFetch({
          read: true,
        });

        return updatedNotification;
      } catch (error) {
        throw new ValidationError(error);
      }
    },
  },
};
