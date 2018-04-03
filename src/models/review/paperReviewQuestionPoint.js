import { Model } from 'objection';
import ReviewQuestion from './reviewQuestion';
import Paper from '../paper/paper';
import User from '../authorization/user';
import PaperTopic from '../paper/paperTopic';

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
      paper_title: { type: 'string' },
      reviewer_name: { type: 'string' },
      point: { type: 'float' },
      content: { type: 'text' },
      comment: { type: 'text' },
      paper_status: { type: 'string' },
      topic_name: { type: 'string' },
      created_at: { type: ['string', 'null'] },
    },
  };

  async $beforeValidate() {
    this.paper_id = parseInt(this.paper_id, 10);
  }

  async $beforeInsert() {
    this.created_at = new Date();
    // review question
    const reviewQuestion = await ReviewQuestion.query().findById(
      this.review_question_id,
    );
    if (reviewQuestion) {
      this.content = reviewQuestion.content;
    }

    // paper
    const paper = await Paper.query().findById(this.paper_id);
    if (paper) {
      this.paper_title = paper.title;
      this.paper_status = paper.status;
    }

    // user
    const user = await User.query().findById(this.user_id);
    if (user) {
      this.reviewer_name = `${user.firstname} ${user.lastname}`;
    }

    // paper topic
    const paperTopic = await PaperTopic.query().where(
      'paper_id',
      this.paper_id,
    );
    if (paperTopic.length > 0) {
      this.topic_name = paperTopic[0].topic_name;
    }
  }
  async $beforeUpdate() {
    // review question
    const reviewQuestion = await ReviewQuestion.query().findById(
      this.review_question_id,
    );
    if (reviewQuestion) {
      this.content = reviewQuestion.content;
    }

    // paper
    const paper = await Paper.query().findById(this.paper_id);
    if (paper) {
      this.paper_title = paper.title;
      this.paper_status = paper.status;
    }

    // user
    const user = await User.query().findById(this.user_id);
    if (user) {
      this.reviewer_name = `${user.firstname} ${user.lastname}`;
    }

    // paper topic
    const paperTopic = await PaperTopic.query().where(
      'paper_id',
      this.paper_id,
    );
    if (paperTopic.length > 0) {
      this.topic_name = paperTopic[0].topic_name;
    }
  }
}
