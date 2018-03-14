import { Model } from 'objection';
import Schedule from '../schedule/schedule';

export default class PersonalSchedule extends Model {
  static tableName = 'personal_schedules';
  static jsonSchema = {
    type: 'object',
    required: ['user_id', 'schedule_id', 'activity_id'],
    properties: {
      id: { type: 'integer' },
      user_id: { type: 'integer' },
      schedule_id: { type: 'integer' },
      conference_id: { type: 'integer' },
      activity_id: { type: 'integer' },
      paper_id: { type: 'integer' },
      start: { type: ['string', 'null'] },
      end: { type: ['string', 'null'] },
      activity_title: { type: ['string', 'null'], maxLength: '100' },
      activity_description: { type: ['text', 'null'], maxLength: '300' },
      activity_status: {
        enum: ['on', 'off'],
        default: 'on',
      },
      room_name: { type: ['string', 'null'], maxLength: '50' },
      room_seats: { type: 'integer' },
      room_status: {
        enum: ['on', 'off'],
        default: 'on',
      },
    },
  };

  async $beforeValidate(opt) {
    this.id = parseInt(opt.old.id, 10);
    this.user_id = parseInt(opt.old.user_id, 10);
    this.schedule_id = parseInt(opt.old.schedule_id, 10);
    this.conference_id = parseInt(opt.old.conference_id, 10);
    this.activity_id = parseInt(opt.old.activity_id, 10);
    this.paper_id = parseInt(opt.old.paper_id, 10);
  }

  async $beforeInsert() {
    const schedule = await Schedule.query().where('id', this.schedule_id);
    this.conference_id = schedule[0].conference_id;
    this.activity_id = schedule[0].activity_id;
    this.paper_id = schedule[0].paper_id;
    this.start = schedule[0].start;
    this.end = schedule[0].end;
    this.activity_title = schedule[0].activity_title;
    this.activity_description = schedule[0].activity_description;
    this.activity_status = schedule[0].activity_status;
    this.room_name = schedule[0].room_name;
    this.room_seats = schedule[0].room_seats;
    this.room_status = schedule[0].room_status;
  }

  async $beforeUpdate() {
    const schedule = await Schedule.query().where('id', this.schedule_id);
    this.conference_id = schedule[0].conference_id;
    this.activity_id = schedule[0].activity_id;
    this.paper_id = schedule[0].paper_id;
    this.start = schedule[0].start;
    this.end = schedule[0].end;
    this.activity_title = schedule[0].activity_title;
    this.activity_description = schedule[0].activity_description;
    this.activity_status = schedule[0].activity_status;
    this.room_name = schedule[0].room_name;
    this.room_seats = schedule[0].room_seats;
    this.room_status = schedule[0].room_status;
  }
}
