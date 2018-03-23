const faker = require('faker');
const paperReviewers = require('../review/paperReviewerData');
const reviewQuestions = require('../review/reviewQuestionData');

const paperReview = [];
for (let i = 1; i <= 15; i += 1) {
  const paperReviewerId = faker.random.number({ min: 1, max: 10 }) - 1;
  const paperReviewer = paperReviewers[paperReviewerId];
  const reviewerQuestionId = faker.random.number({ min: 1, max: 10 }) - 1;
  const reviewQuestion = reviewQuestions[reviewerQuestionId];
  const point = faker.random.number({ min: 1, max: 5 });
  const comment = faker.lorem.sentence();
  paperReview.push({
    paper_id: paperReviewer.paper_id,
    user_id: paperReviewer.user_id,
    paper_title: paperReviewer.paper_title,
    reviewer_name: paperReviewer.reviewer_name,
    conference_id: paperReviewer.conference_id,
    paper_status: paperReviewer.paper_status,
    topic_name: paperReviewer.topic_name,
    created_at: new Date(),
    review_question_id: reviewerQuestionId + 1,
    content: reviewQuestion.content,
    point,
    comment,
  });
}

module.exports = paperReview;
