const faker = require('faker');
const users = require('../authorization/userData');
const papers = require('../paper/paperData');

const paperAuthors = [];
for (let i = 1; i <= 20; i += 1) {
  const authorId = faker.random.number({ min: 1, max: 10 }) - 1;
  const paperId = faker.random.number({ min: 1, max: 10 }) - 1;
  const author = users[authorId];
  const paper = papers[paperId];
  paperAuthors.push({
    paper_id: paperId + 1,
    user_id: authorId + 1,
    author_name: author.firstname + author.lastname,
    author_email: users[authorId].email,
    author_title: users[authorId].position,
    corresponding: faker.random.arrayElement([1, 2, 3]),
    conference_id: paper.conference_id,
    paper_status: paper.status,
  });
}

module.exports = paperAuthors;
