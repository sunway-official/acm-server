const faker = require('faker');

const newsLikes = [
  {
    news_id: '1',
    user_id: '1',
  },
  {
    news_id: '1',
    user_id: '2',
  },
  {
    news_id: '2',
    user_id: '1',
  },
  {
    news_id: '2',
    user_id: '2',
  },
  {
    news_id: '3',
    user_id: '1',
  },
  {
    news_id: '3',
    user_id: '2',
  },
  {
    news_id: '3',
    user_id: '3',
  },
  {
    news_id: '3',
    user_id: '4',
  },
];

for (let i = 0; i < 100; i += 1) {
  newsLikes.push({
    user_id: faker.random.arrayElement([1, 2, 3, 4]),
    news_id: faker.random.number({
      min: 1,
      max: 70,
    }),
  });
}

module.exports = newsLikes;
