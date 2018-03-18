const topics = require('../topic/topicsData');
const faker = require('faker');

const paperTopics = [];
for (let i = 1; i < 14; i += 1) {
  const topicId = faker.random.number({ min: 1, max: 9 }) - 1;
  const topic = topics[topicId];
  paperTopics.push({
    paper_id: i,
    topic_id: topicId + 1,
    topic_name: topic.name,
    topic_description: topic.description,
    topic_color_code: topic.color_code,
  });
}

module.exports = paperTopics;
