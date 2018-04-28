const faker = require('faker');
const usersData = require('../authorization/userData');

const user_ratings = [];

for (let i = 1; i <= 512; i += 1) {
  const rater = faker.random.arrayElement(usersData);
  const user = faker.random.arrayElement(usersData);
  const rating = faker.random.number({
    min: 0,
    max: 5,
    precision: 0.5,
  });

  user_ratings.push({
    conference_id: 1,
    rater_id: rater.id,
    user_id: user.id,
    rating,
  });
}

module.exports = user_ratings;
