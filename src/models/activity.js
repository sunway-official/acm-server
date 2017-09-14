import { Model } from 'objection';

export default class Activity extends Model {
  static tableName = 'activities';
  static jsonSchema = {
    type: 'object',
    required: ['conference_id', 'activity_type_id', 'title'],
    properties: {
      id: { type: 'integer' },
      conference_id: { type: 'integer' },
      activity_type_id: { type: 'integer' },
      title: { type: 'string', maxLength: '300' },
      status: {
        enum: ['on', 'off'],
        default: 'on',
      },
    },
  };

  async $beforeValidate(opt) {
    this.id = parseInt(opt.old.id, 10);
    this.conference_id = parseInt(opt.old.conference_id, 10);
    this.activity_type_id = parseInt(opt.old.activity_type_id, 10);
  }

  async $beforeInsert() {
    if (!this.status) this.status = 'on';
  }
}
