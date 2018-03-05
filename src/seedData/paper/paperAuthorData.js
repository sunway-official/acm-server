const authors = require('../paper/authorData');
const faker = require('faker');

const paperAuthors = [];
for (let i = 1; i <= 50; i += 1) {
  const authorId = faker.random.number({ min: 1, max: 10 }) - 1;
  paperAuthors.push({
    paper_id: faker.random.number({ min: 1, max: 25 }),
    author_id: authorId + 1,
    author_name: authors[authorId].name,
    author_email: authors[authorId].email,
    author_title: authors[authorId].title,
  });
}

module.exports = paperAuthors;
