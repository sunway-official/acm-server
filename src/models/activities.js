import { Model } from 'objection';

export default class Activities extends Model {
  static tableName = 'activities';
  static jsonSchema = {
    type: 'object',
    description: 'All activities',
    properties: {
      id: { type: 'integer' },
      conference_id: { type: 'integer' },
      activity_type_id: { type: 'integer' },
      title: { type: 'string', maxLength: '300' },
      activity_status: { type: 'string', maxLength: '100' },
    },
  };

  async $beforeValidate(opt) {
    this.id = parseInt(opt.old.id, 10);
    this.conference_id = parseInt(opt.old.conference_id, 10);
    this.activity_type_id = parseInt(opt.old.activity_type_id, 10);
  }
}
