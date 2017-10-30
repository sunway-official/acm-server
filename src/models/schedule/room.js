import { Model } from 'objection';
import Schedule from './schedule';

export default class Room extends Model {
  static tableName = 'rooms';
  static jsonSchema = {
    type: 'object',
    required: ['name', 'seat_num'],
    properties: {
      id: { type: 'integer' },
      name: { type: 'string', maxLength: '300' },
      seats: { type: 'integer' },
      status: {
        enum: ['on', 'off'],
        default: 'on',
      },
    },
  };

  async $beforeValidate(opt) {
    this.id = parseInt(opt.old.id, 10);
  }

  async $beforeInsert() {
    if (!this.status) this.status = 'on';
  }

  async deleteSchedule() {
    const schedules = await Schedule.query().where('room_id', this.id);

    if (schedules) {
      schedules.map(schedule => schedule.deletePersonalSchedule());
      await Schedule.query()
        .delete()
        .where('room_id', this.id);
    }

    return schedules;
  }
}
