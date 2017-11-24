import { Model } from 'objection';
import Topic from './topic';

export default class Color extends Model {
  static tableName = 'colors';
  static jsonSchema = {
    type: 'object',
    required: ['name', 'color_code'],
    properties: {
      id: { type: 'integer' },
      name: { type: 'string', maxLength: '100' },
      code: { type: 'string', maxLength: '8' },
    },
  };

  async $beforeValidate(opt) {
    this.id = parseInt(opt.old.id, 10);
  }

  async deleteTopics() {
    const topics = await Topic.query().where('color_id', this.id);

    if (topics) {
      topics.map(async topic => topic.deleteAllRelationship());
      await Topic.query()
        .delete()
        .where('color_id', this.id);
    }
    return topics;
  }
  async deleteAllRelationship() {
    this.deleteTopics();
  }
}
