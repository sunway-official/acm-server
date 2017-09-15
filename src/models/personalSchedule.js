import { Model } from 'objection';

export default class PersonalSchedule extends Model {
  static tableName = 'personal_schedules';
  static jsonSchema = {
    type: 'object',
    required: ['user_id', 'schedule_id', 'activity_id'],
    properties: {
      id: { type: 'integer' },
      user_id: { type: 'integer' },
      schedule_id: { type: 'integer' },
      activity_id: { type: 'integer' },
    },
  };

  async $beforeValidate(opt) {
    this.id = parseInt(opt.old.id, 10);
    this.user_id = parseInt(opt.old.user_id, 10);
    this.schedule_id = parseInt(opt.old.schedule_id, 10);
    this.activity_id = parseInt(opt.old.activity_id, 10);
  }
}
