const topics = require('../topic/topicsData');
const faker = require('faker');

const paperTopics = [];
for (let i = 1; i < 9; i += 1) {
  const topicId = i;
  paperTopics.push({
    paper_id: faker.random.number({ min: 1, max: 13 }),
    topic_id: topicId,
    topic_name: topics[topicId - 1].name,
    topic_description: topics[topicId - 1].description,
    topic_color_code: topics[topicId - 1].color_code,
  });
}

module.exports = paperTopics;
