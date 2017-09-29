const faker = require('faker');

const newsData = [
  {
    user_id: '1',
    conference_id: '0',
    content: 'This component only works with a feed',
  },
  {
    user_id: '1',
    conference_id: '0',
    content: 'By default, all feeds are set to fifteen events, over 180 days.',
  },
  {
    user_id: '1',
    conference_id: '0',
    content: 'Events will display until their end time is reached.',
  },
  {
    user_id: '2',
    conference_id: '0',
    content: 'The number of African wild dogs in a pack',
  },
  {
    user_id: '2',
    conference_id: '0',
    content: 'Councilors in London’s Kensington and Chelsea borough',
  },
  {
    user_id: '2',
    conference_id: '0',
    content: 'Crossrail is a megaproject meant to bind London together',
  },
  {
    user_id: '3',
    conference_id: '0',
    content: 'This component only works with a feed',
  },
  {
    user_id: '3',
    conference_id: '0',
    content: 'Councilors in London’s Kensington and Chelsea borough',
  },
];

for (let i = 0; i < 100; i += 1) {
  newsData.push({
    user_id: faker.random.arrayElement([1, 2, 3]),
    conference_id: 0,
    content: faker.lorem.sentence(),
  });
}

module.exports = newsData;
