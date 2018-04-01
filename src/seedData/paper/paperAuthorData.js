const faker = require('faker');
const users = require('../authorization/userData');
const papers = require('../paper/paperData');

const paperAuthors = [];
for (let i = 1; i <= 30; i += 1) {
  const authorId = faker.random.number({ min: 19, max: 21 });
  const paperId = faker.random.number({ min: 1, max: 33 });
  const author = users[authorId - 1];
  const paper = papers[paperId - 1];
  paperAuthors.push({
    paper_id: paperId,
    user_id: authorId,
    author_name: `${author.firstname} ${author.lastname}`,
    author_email: users[authorId].email,
    author_title: users[authorId].position,
    corresponding: faker.random.arrayElement([1, 2]),
    conference_id: paper.conference_id,
    paper_status: paper.status,
    author_zipcode: faker.random.number({ min: 1000000, max: 9999999 }),
  });
}

module.exports = paperAuthors;
