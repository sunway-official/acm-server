const faker = require('faker');

const reviewQuestions = [];
for (let i = 1; i <= 20; i += 1) {
  reviewQuestions.push({
    conference_id: 1,
    content: faker.lorem.sentence(),
  });
}
module.exports = reviewQuestions;
