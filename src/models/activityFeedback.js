import { Model } from 'objection';

export default class ActivityFeedback extends Model {
  static tableName = 'activity_feedback';
  static jsonSchema = {
    type: 'object',
    description: 'all feedback of activity',
    properties: {
      id: { type: 'integer' },
      activity_id: { type: 'integer' },
      user_id: { type: 'integer' },
      content: { type: 'string' },
      rating: { type: 'number' },
      created_at: { type: ['string', 'null'] },
    },
  };

  async $beforeValidate(opt) {
    this.id = parseInt(opt.old.id, 10);
    this.activity_id = parseInt(opt.old.activity_id, 10);
    this.user_id = parseInt(opt.old.user_id, 10);
  }
}
