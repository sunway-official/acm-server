import { Model } from 'objection';
import ActivityTopic from '../activity/activityTopic';

export default class Topic extends Model {
  static tableName = 'topics';
  static jsonSchema = {
    type: 'object',
    required: ['name'],
    properties: {
      id: { type: 'integer' },
      conference_id: { type: 'integer' },
      name: { type: 'string', maxLength: '100' },
      description: { type: 'string', maxLength: '300' },
    },
  };

  async $beforeValidate(opt) {
    this.id = parseInt(opt.old.id, 10);
    this.conference_id = parseInt(opt.old.conference_id, 10);
  }

  // delete all activityTopics of topic with id
  async deleteActivityTopic() {
    const activityTopic = await ActivityTopic.query().where(
      'topic_id',
      this.id,
    );

    if (activityTopic) {
      await ActivityTopic.query()
        .delete()
        .where('topic_id', this.id);
    }

    return activityTopic;
  }
  async deleteAllRelationship() {
    this.deleteActivityTopic();
  }
}
