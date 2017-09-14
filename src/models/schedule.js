import { Model } from 'objection';

export default class Schedule extends Model {
  static tableName = 'schedules';
  static jsonSchema = {
    type: 'object',
    properties: {
      id: { type: 'integer' },
      activity_id: { type: 'integer' },
      room_id: { type: 'integer' },
      start: { type: ['string', 'null'] },
      end: { type: ['string', 'null'] },
    },
  };

  async $beforeValidate(opt) {
    this.id = parseInt(opt.old.id, 10);
    this.activity_id = parseInt(opt.old.activity_id, 10);
    this.room_id = parseInt(opt.old.room_id, 10);
  }
}
