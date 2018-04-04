export default async function handlePushNotification(expo, notification) {
  const messages = [];
  messages.push(notification);

  const chunks = expo.chunkPushNotifications(messages);

  chunks.forEach(async chunk => {
    await expo.sendPushNotificationsAsync(chunk);
  });
}
