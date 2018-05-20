const faker = require('faker');

/* eslint-disable */
const newsPhotos = [
  {
    news_id: '1',
    name: 'This component only works with a feed',
    url:
      'https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f3cf5198be760cf5b4920e08b14501a9&auto=format&fit=crop&w=400&q=60',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    news_id: '2',
    name: 'By default, all feeds are set to fifteen events, over 180 days.',
    url:
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f1d076508395c99b386351d72a95c09e&auto=format&fit=crop&w=400&q=60',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    news_id: '3',
    name: 'Events will display until their end time is reached.',
    url:
      'https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0956178e44084db0e4a725c8b1e370e9&auto=format&fit=crop&w=400&q=60',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    news_id: '2',
    name: 'The number of African wild dogs in a pack',
    url:
      'https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1005f3d059e15847f5b8e818aafe7b51&auto=format&fit=crop&w=400&q=60',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    news_id: '3',
    name: 'Councilors in London’s Kensington and Chelsea borough',
    url:
      'https://images.unsplash.com/reserve/NV0eHnNkQDHA21GC3BAJ_Paris%20Louvr.jpg?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a072d79bd3972e96c3772a34deae7971&auto=format&fit=crop&w=400&q=60',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    news_id: '1',
    name: 'Crossrail is a megaproject meant to bind London together',
    url:
      'https://images.unsplash.com/photo-1496902526517-c0f2cb8fdb6a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=8a8623f526569e949b73c4c7360d4532&auto=format&fit=crop&w=400&q=60',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    news_id: '3',
    name: 'This component only works with a feed',
    url:
      'https://images.unsplash.com/photo-1487089427585-85563b1049f3?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=94a38034c192407d90344aac0cf0f656&auto=format&fit=crop&w=400&q=60',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    news_id: '3',
    name: 'Councilors in London’s Kensington and Chelsea borough',
    url:
      'https://images.unsplash.com/photo-1512450820851-6c9ec6b52c0b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e26eb72d7debc634a5b6bd947dda0b5e&auto=format&fit=crop&w=400&q=60',
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
