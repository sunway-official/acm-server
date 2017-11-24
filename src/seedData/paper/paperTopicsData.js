const topics = require('../topic/topicsData');
const faker = require('faker');

const paperTopics = [];
for (let i = 1; i <= 100; i += 1) {
  const topicId = faker.random.number({ min: 1, max: 50 }) - 1;
  paperTopics.push({
    paper_id: faker.random.number({ min: 1, max: 25 }),
    topic_id: topicId + 1,
    topic_name: topics[topicId].name,
    topic_description: topics[topicId].description,
    topic_color_code: topics[topicId].color_code,
  });
}

module.exports = paperTopics;
