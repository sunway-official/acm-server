const faker = require('faker');

const newsPhotos = [
  {
    news_id: '1',
    name: 'This component only works with a feed',
    url: 'http://lorempixel.com/400/300/business/',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    news_id: '2',
    name: 'By default, all feeds are set to fifteen events, over 180 days.',
    url: 'http://lorempixel.com/400/300/business/',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    news_id: '3',
    name: 'Events will display until their end time is reached.',
    url: 'http://lorempixel.com/400/300/business/',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    news_id: '2',
    name: 'The number of African wild dogs in a pack',
    url: 'http://lorempixel.com/400/300/business/',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    news_id: '3',
    name: 'Councilors in London’s Kensington and Chelsea borough',
    url: 'http://lorempixel.com/400/300/business/',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    news_id: '1',
    name: 'Crossrail is a megaproject meant to bind London together',
    url: 'http://lorempixel.com/400/300/business/',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    news_id: '3',
    name: 'This component only works with a feed',
    url: 'http://lorempixel.com/400/300/business/',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    news_id: '3',
    name: 'Councilors in London’s Kensington and Chelsea borough',
    url: 'http://lorempixel.com/400/300/business/',
    created_at: new Date(),
    updated_at: new Date(),
  },
];

for (let i = 0; i < 50; i += 1) {
  newsPhotos.push({
    news_id: faker.random.number({
      min: 1,
      max: 100,
    }),
    name: faker.name.title(),
    url: 'http://lorempixel.com/400/300/business/',
    created_at: new Date(),
    updated_at: new Date(),
  });
}

module.exports = newsPhotos;
