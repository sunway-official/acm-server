import { Model } from 'objection';

export default class Question extends Model {
  static tableName = 'questions';
  static jsonSchema = {
    type: 'object',
    description: 'A question',
    properties: {
      id: { type: 'integer' },
      user_id: { type: 'integer' },
      activity_id: { type: 'integer' },
      content: { type: 'string' },
      created_at: { type: ['string', 'null'] },
    },
  };

  async $beforeValidate(opt) {
    this.id = parseInt(opt.old.id, 10);
    this.activity_id = parseInt(opt.old.activity_id, 10);
    this.user_id = parseInt(opt.old.user_id, 10);
  }
}
