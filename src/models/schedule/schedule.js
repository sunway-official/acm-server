import { Model } from 'objection';
import PersonalSchedule from './personalSchedule';
import Room from './room';
import Activity from '../activity/activity';

export default class Schedule extends Model {
  static tableName = 'schedules';
  static jsonSchema = {
    type: 'object',
    required: ['conference_id', 'room_id', 'start', 'end'],
    properties: {
      id: { type: 'integer' },
      activity_id: { type: 'integer' },
      paper_id: { type: 'integer' },
      conference_id: { type: 'integer' },
      room_id: { type: 'integer' },
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
    this.activity_id = parseInt(opt.old.activity_id, 10);
    this.conference_id = parseInt(opt.old.conference_id, 10);
    this.room_id = parseInt(opt.old.room_id, 10);
  }

  async $beforeInsert() {
    const room = await Room.query().where('id', this.room_id);
    const activity = await Activity.query().where('id', this.activity_id);
    this.conference_id = activity[0].conference_id;
    this.paper_id = activity[0].paper_id;
    this.activity_title = activity[0].title;
    this.activity_description = activity[0].description;
    this.activity_status = activity[0].status;
    this.room_name = room[0].name;
    this.room_seats = room[0].seats;
    this.room_status = room[0].status;
  }

  async $beforeUpdate() {
    const room = await Room.query().where('id', this.room_id);
    const activity = await Activity.query().where('id', this.activity_id);
    this.conference_id = activity[0].conference_id;
    this.paper_id = activity[0].paper_id;
    this.activity_title = activity[0].title;
    this.activity_description = activity[0].description;
    this.activity_status = activity[0].status;
    this.room_name = room[0].name;
    this.room_seats = room[0].seats;
    this.room_status = room[0].status;
  }

  async deletePersonalSchedule() {
    const personalSchedules = await PersonalSchedule.query().where(
      'schedule_id',
      this.id,
    );
    if (!personalSchedules) return [];
    await PersonalSchedule.query()
      .delete()
      .where('schedule_id', this.id);
    return personalSchedules;
  }
}
