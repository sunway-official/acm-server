import { Model } from 'objection';

export default class Room extends Model {
  static tableName = 'rooms';
  static jsonSchema = {
    type: 'object',
    properties: {
      id: { type: 'integer' },
      name: { type: 'string', maxLength: '300' },
      status: {
        enum: ['on', 'off'],
        default: 'on',
      },
      seat_num: { type: 'integer' },
    },
  };

  async $beforeValidate(opt) {
    this.id = parseInt(opt.old.id, 10);
  }

  async $beforeInsert() {
    if (!this.status) this.status = 'on';
  }
}
