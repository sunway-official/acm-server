const faker = require('faker');

const senderId = faker.random.number({ min: 0, max: 10 });
const receiverId = faker.random.number({ min: 11, max: 20 });

const notifications = [];
for (let i = 0; i <= 10; i += 1) {
  notifications.push({
    sender_id: senderId,
    receiver_id: receiverId,
    title: faker.random.words(10),
    content: faker.random.words(10),
    read: faker.random.boolean(),
  });
}

module.exports = notifications;
