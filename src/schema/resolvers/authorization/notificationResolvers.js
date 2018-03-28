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
            to: sender.notification_key,
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
  },
};
