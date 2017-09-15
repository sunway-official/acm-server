import { Model } from 'objection';

export default class ConferenceTopic extends Model {
  static tableName = 'conference_topics';
  static jsonSchema = {
    type: 'object',
    required: ['conference_id', 'topic_id'],
    description: 'A default conference topic',
    properties: {
      id: { type: 'integer' },
      conference_id: { type: 'integer' },
      topic_id: { type: 'integer' },
    },
  };

  async $beforeValidate(opt) {
    this.conference_id = parseInt(opt.old.conference_id, 10);
    this.topic_id = parseInt(opt.old.topic_id, 10);
  }
}
