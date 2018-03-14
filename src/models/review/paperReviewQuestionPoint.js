import { Model } from 'objection';
import ReviewQuestion from './reviewQuestion';

export default class PaperReviewQuestionPoint extends Model {
  static tableName = 'paper_review_questions_points';
  static jsonSchema = {
    type: 'object',
    required: ['paper_id', 'user_id', 'point'],
    properties: {
      id: { type: 'integer' },
      conference_id: { type: 'integer' },
      paper_id: { type: 'integer' },
      user_id: { type: 'integer' },
      point: { type: 'float' },
      content: { type: 'text' },
      comment: { type: 'text' },
    },
  };

  async $beforeValidate() {
    this.paper_id = parseInt(this.paper_id, 10);
  }

  async $beforeInsert() {
    const reviewQuestion = await ReviewQuestion.query().findById(
      this.review_question_id,
    );
    console.log(reviewQuestion);
    this.content = reviewQuestion.content;
  }
  async $beforeUpdate() {
    const reviewQuestion = await ReviewQuestion.query().findById(
      this.review_question_id,
    );
    this.content = reviewQuestion.content;
  }
}
