import { Model } from 'objection';

export default class ConferenceAttendee extends Model {
  static tableName = 'categories';
  static jsonSchema = {
    type: 'object',
    required: ['id', 'name'],
    description: 'Categories of conference',
    properties: {
      id: { type: 'integer' },
      name: { type: 'string' },
    },
  };

  async $beforeValidate(opt) {
    this.id = parseInt(opt.old.id, 10);
  }
}
