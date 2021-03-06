import { Model } from 'objection';

export default class ConferenceAttendee extends Model {
  static tableName = 'conferences_attendees';
  static jsonSchema = {
    type: 'object',
    required: ['conference_id', 'user_id'],
    description: 'An attendee in a conference',
    properties: {
      id: { type: 'integer' },
      conference_id: { type: 'integer' },
      user_id: { type: 'integer' },
    },
  };

  async $beforeValidate(opt) {
    this.id = parseInt(opt.old.id, 10);
    this.conference_id = parseInt(opt.old.conference_id, 10);
    this.user_id = parseInt(opt.old.user_id, 10);
  }
}
