import { Model } from 'objection';

export default class Rooms extends Model {
  static tableName = 'rooms';
  static jsonSchema = {
    type: 'object',
    description: 'All rooms',
    properties: {
      id: { type: 'integer' },
      name: { type: 'string', maxLength: '300' },
      status: { type: 'string', maxLength: '100' },
      seat_num: { type: 'integer' },
    },
  };

  async $beforeValidate(opt) {
    this.id = parseInt(opt.old.id, 10);
  }
}
