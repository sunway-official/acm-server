const faker = require('faker');
const users = require('../authorization/userData');
const papers = require('../paper/paperData');

const paperReviewers = [];
for (let i = 1; i <= 20; i += 1) {
  const reviewerId = faker.random.number({ min: 1, max: 10 }) - 1;
  const paperId = faker.random.number({ min: 1, max: 10 }) - 1;
  const reviewer = users[reviewerId];
  const paper = papers[paperId];
  paperReviewers.push({
    paper_id: paperId + 1,
    user_id: reviewerId + 1,
    paper_title: paper.title,
    reviewer_name: reviewer.firstname + reviewer.lastname,
    conference_id: paper.conference_id,
    paper_status: paper.status,
  });
}

module.exports = paperReviewers;
