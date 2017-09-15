import { Model } from 'objection';

export default class ActivityTopic extends Model {
  static tableName = 'activity_topics';
  static jsonSchema = {
    type: 'object',
    description: 'All topics of activity',
    required: ['activity_id', 'topic_id'],
    properties: {
      id: { type: 'integer' },
      activity_id: { type: 'integer' },
      topic_id: { type: 'integer' },
    },
  };

  async $beforeValidate(opt) {
    this.id = parseInt(opt.old.id, 10);
    this.activity_id = parseInt(opt.old.activity_id, 10);
    this.topic_id = parseInt(opt.old.topic_id, 10);
  }
}
