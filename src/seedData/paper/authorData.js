const faker = require('faker');

const authors = [];

for (let i = 0; i < 10; i += 1) {
  authors.push({
    name: faker.name,
    email: faker.email,
    title: faker.title,
  });
}

module.exports = authors;
