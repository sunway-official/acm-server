const faker = require('faker');

const IMG_URL = [
  'scott-webb-205351-unsplash.jpg',
  'photo-1517048676732-d65bc937f952.jpg',
  'photo-1515187029135-18ee286d815b.jpg',
  'photo-1512450820851-6c9ec6b52c0b.jpg',
  'photo-1511578314322-379afb476865.jpg',
  'photo-1505373877841-8d25f7d46678.jpg',
  'photo-1496902526517-c0f2cb8fdb6a.jpg',
  'photo-1487089427585-85563b1049f3.jpg',
];

/* eslint-disable */
const newsPhotos = [
  {
    news_id: '1',
    name: 'This component only works with a feed',
    url: faker.random.arrayElement(IMG_URL),
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    news_id: '2',
    name: 'By default, all feeds are set to fifteen events, over 180 days.',
    url: faker.random.arrayElement(IMG_URL),
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    news_id: '3',
    name: 'Events will display until their end time is reached.',
    url: faker.random.arrayElement(IMG_URL),
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    news_id: '2',
    name: 'The number of African wild dogs in a pack',
    url: faker.random.arrayElement(IMG_URL),
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    news_id: '3',
    name: 'Councilors in London’s Kensington and Chelsea borough',
    url: faker.random.arrayElement(IMG_URL),
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    news_id: '1',
    name: 'Crossrail is a megaproject meant to bind London together',
    url: faker.random.arrayElement(IMG_URL),
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    news_id: '3',
    name: 'This component only works with a feed',
    url: faker.random.arrayElement(IMG_URL),
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    news_id: '3',
    name: 'Councilors in London’s Kensington and Chelsea borough',
    url: faker.random.arrayElement(IMG_URL),
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
    url: faker.random.arrayElement(IMG_URL),
    created_at: new Date(),
    updated_at: new Date(),
  });
}

module.exports = newsPhotos;
