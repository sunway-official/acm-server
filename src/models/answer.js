import { Model } from 'objection';

export default class Answer extends Model {
  static tableName = 'answers';
  static jsonSchema = {
    type: 'object',
    description: 'all answers',
    required: ['user_id', 'question_id', 'content'],
    properties: {
      id: { type: 'integer' },
      user_id: { type: 'integer' },
      question_id: { type: 'integer' },
      content: { type: 'string' },
      created_at: { type: ['string', 'null'] },
    },
  };

  async $beforeValidate(opt) {
    this.id = parseInt(opt.old.id, 10);
    this.question_id = parseInt(opt.old.question_id, 10);
    this.user_id = parseInt(opt.old.user_id, 10);
  }
}
