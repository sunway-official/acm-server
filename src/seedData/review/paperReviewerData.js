const faker = require('faker');
const users = require('../authorization/userData');
const papers = require('../paper/paperData');

const paperReviewers = [];
for (let i = 1; i <= 13; i += 1) {
  const reviewerId = faker.random.number({ min: 20, max: 22 });
  const paperId = i;
  const reviewer = users[reviewerId - 1];
  const paper = papers[paperId - 1];
  if (paper.paper_status_id != 4) {
    paperReviewers.push({
      paper_id: paperId,
      user_id: reviewerId,
      paper_title: paper.title,
      reviewer_name: `${reviewer.firstname} ${reviewer.lastname}`,
      conference_id: paper.conference_id,
      paper_status: paper.status,
    });
  }
}

module.exports = paperReviewers;
