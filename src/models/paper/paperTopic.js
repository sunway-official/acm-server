import { Model } from 'objection';
import Topic from '../topic/topic';

export default class PaperTopic extends Model {
  static tableName = 'papers_topics';
  static jsonSchema = {
    type: 'object',
    description: 'All topics of paper',
    required: ['paper_id', 'topic_id'],
    properties: {
      id: { type: 'integer' },
      paper_id: { type: 'integer' },
      topic_id: { type: 'integer' },
      topic_name: { type: 'string', maxLength: '100' },
      topic_description: { type: 'text', maxLength: '100' },
      topic_color_code: { type: 'string', maxLength: '8' },
    },
  };

  async $beforeValidate(opt) {
    this.id = parseInt(opt.old.id, 10);
    this.paper_id = parseInt(opt.old.paper_id, 10);
    this.topic_id = parseInt(opt.old.topic_id, 10);
  }

  async $beforeInsert() {
    const topic = await Topic.query().where('id', this.topic_id);
    this.topic_name = topic[0].name;
    this.topic_description = topic[0].description;
    this.topic_color_code = topic[0].color_code;
  }
  async $beforeUpdate() {
    const topic = await Topic.query().where('id', this.topic_id);
    this.topic_name = topic[0].name;
    this.topic_description = topic[0].description;
    this.topic_color_code = topic[0].color_code;
  }
}
