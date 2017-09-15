import { Model } from 'objection';
import ConferenceTopic from './conferenceTopic';

export default class Topic extends Model {
  static tableName = 'topics';
  static jsonSchema = {
    type: 'object',
    required: ['name'],
    properties: {
      id: { type: 'integer' },
      name: { type: 'string', maxLength: '100' },
      description: { type: 'string', maxLength: '300' },
    },
  };

  async $beforeValidate(opt) {
    this.id = parseInt(opt.old.id, 10);
  }

  // delete all conferenceTopic of conference with id
  async deleteConConferenceTopic() {
    const conferenceTopics = await ConferenceTopic.query().where(
      'topic_id',
      this.id,
    );

    if (conferenceTopics) {
      await ConferenceTopic.query()
        .delete()
        .where('topic_id', this.id);
    }

    return conferenceTopics;
  }
}
