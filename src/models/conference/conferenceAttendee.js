import { Model } from 'objection';

export default class ConferenceAttendee extends Model {
  static tableName = 'conferences_attendees';
  static jsonSchema = {
    type: 'object',
    description: 'An attendee in a conference',
    properties: {
      id: { type: 'integer' },
      conference_id: { type: 'integer' },
      user_id: { type: 'integer' },
    },
  };

  async $beforeValidate(opt) {
    this.conference_id = parseInt(opt.old.conference_id, 10);
    this.user_id = parseInt(opt.old.user_id, 10);
  }
}
