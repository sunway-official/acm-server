const colors = require('./colorsData');
const faker = require('faker');

const getTopics = i => [
  {
    conference_id: i,
    name: 'AI',
    description: faker.lorem.sentences(2),
    color_id: 1,
    color_code: colors[1 - 1].code,
  },
  {
    conference_id: i,
    name: 'Algorithm',
    description: faker.lorem.sentences(2),
    color_id: 2,
    color_code: colors[2 - 1].code,
  },
  {
    conference_id: i,
    name: 'Blockchain',
    description: faker.lorem.sentences(2),
    color_id: 3,
    color_code: colors[3 - 1].code,
  },
  {
    conference_id: i,
    name: 'Cloud',
    description: faker.lorem.sentences(2),
    color_id: 4,
    color_code: colors[4 - 1].code,
  },
  {
    conference_id: i,
    name: 'Internet',
    description: faker.lorem.sentences(2),
    color_id: 5,
    color_code: colors[5 - 1].code,
  },
  {
    conference_id: i,
    name: 'Future',
    description: faker.lorem.sentences(2),
    color_id: 6,
    color_code: colors[6 - 1].code,
  },
  {
    conference_id: i,
    name: 'Markets',
    description: faker.lorem.sentences(2),
    color_id: 7,
    color_code: colors[7 - 1].code,
  },
  {
    conference_id: i,
    name: 'Marketing',
    description: faker.lorem.sentences(2),
    color_id: 8,
    color_code: colors[8 - 1].code,
  },
  {
    conference_id: i,
    name: 'Online video',
    description: faker.lorem.sentences(2),
    color_id: 9,
    color_code: colors[9 - 1].code,
  },
];
let topics = [];
for (let i = 1; i <= 6; i += 1) {
  topics = topics.concat(getTopics(i));
}

module.exports = topics;
