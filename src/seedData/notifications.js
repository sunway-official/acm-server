const faker = require('faker');

const notifications = [];
for (let i = 0; i <= 500; i += 1) {
  const senderId = faker.random.number({ min: 1, max: 20 });
  const receiverId = faker.random.number({ min: 1, max: 20 });

  notifications.push({
    sender_id: senderId,
    receiver_id: receiverId,
    title: faker.random.words(10),
    content: faker.random.words(10),
    read: faker.random.boolean(),
    hide: faker.random.boolean(),
  });
}

module.exports = notifications;
