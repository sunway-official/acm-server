const faker = require('faker');

const newsLikes = [
  {
    news_id: '1',
    user_id: '1',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    news_id: '1',
    user_id: '2',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    news_id: '2',
    user_id: '1',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    news_id: '2',
    user_id: '2',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    news_id: '3',
    user_id: '1',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    news_id: '3',
    user_id: '2',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    news_id: '3',
    user_id: '3',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    news_id: '3',
    user_id: '4',
    created_at: new Date(),
    updated_at: new Date(),
  },
];

for (let i = 0; i < 50; i += 1) {
  newsLikes.push({
    user_id: faker.random.arrayElement([1, 2, 3, 4]),
    news_id: faker.random.number({
      min: 1,
      max: 70,
    }),
    created_at: new Date(),
    updated_at: new Date(),
  });
}

module.exports = newsLikes;
