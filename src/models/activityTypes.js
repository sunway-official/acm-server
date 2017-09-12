import { Model } from 'objection';

export default class ActivityTypes extends Model {
  static tableName = 'activity_types';
  static jsonSchema = {
    type: 'object',
    description: 'all types of activity',
    properties: {
      id: { type: 'integer' },
      type: { type: 'string', maxLength: '100' },
    },
  };

  async $beforeValidate(opt) {
    this.id = parseInt(opt.old.id, 10);
  }
}
