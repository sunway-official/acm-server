const faker = require('faker');

const newsData = [
  {
    user_id: '1',
    conference_id: '1',
    content: 'This component only works with a feed',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    user_id: '1',
    conference_id: '1',
    content: 'By default, all feeds are set to fifteen events, over 181 days.',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    user_id: '1',
    conference_id: '1',
    content: 'Events will display until their end time is reached.',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    user_id: '2',
    conference_id: '1',
    content: 'The number of African wild dogs in a pack',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    user_id: '2',
    conference_id: '1',
    content: 'Councilors in London’s Kensington and Chelsea borough',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    user_id: '2',
    conference_id: '1',
    content: 'Crossrail is a megaproject meant to bind London together',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    user_id: '3',
    conference_id: '1',
    content: 'This component only works with a feed',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    user_id: '3',
    conference_id: '1',
    content: 'Councilors in London’s Kensington and Chelsea borough',
    created_at: new Date(),
    updated_at: new Date(),
  },
];

for (let i = 1; i < 70; i += 1) {
  newsData.push({
    user_id: faker.random.arrayElement([1, 6, 12]),
    conference_id: 1,
    content: faker.lorem.sentence(),
    created_at: new Date(),
    updated_at: new Date(),
  });
}

module.exports = newsData;
