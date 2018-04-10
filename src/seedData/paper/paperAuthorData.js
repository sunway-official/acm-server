const faker = require('faker');
const users = require('../authorization/userData');
const papers = require('../paper/paperData');

const paperAuthors = [];
for (let i = 1; i <= 33; i += 1) {
  const authorId = faker.random.number({ min: 19, max: 21 });
  const paperId = faker.random.number({ min: 1, max: 33 });
  const author = users[authorId - 1];
  const paper = papers[paperId - 1];
  paperAuthors.push({
    paper_id: paperId,
    user_id: authorId,
    corresponding: faker.random.arrayElement([1, 2]),
    conference_id: paper.conference_id,
    paper_status: paper.status,
    author_name: `${author.firstname} ${author.lastname}`,
    author_email: users[authorId].email,
    author_title: users[authorId].position,
    author_organization: faker.lorem.words(4),
    author_street: faker.lorem.words(6),
    author_city: faker.lorem.word(),
    author_country: faker.lorem.words(2),
    author_zipcode: faker.random.number({ min: 1000000, max: 9999999 }),
  });
}

module.exports = paperAuthors;
