import { Model } from 'objection';
import Schedule from './schedule';
import ActivityFeedback from './activityFeedback';
import ActivityTopic from './activityTopic';

export default class Activity extends Model {
  static tableName = 'activities';
  static jsonSchema = {
    type: 'object',
    required: ['conference_id', 'activity_type_id', 'title'],
    properties: {
      id: { type: 'integer' },
      conference_id: { type: 'integer' },
      activity_type_id: { type: 'integer' },
      title: { type: 'string', maxLength: '300' },
      status: {
        enum: ['on', 'off'],
        default: 'on',
      },
    },
  };

  async $beforeValidate(opt) {
    this.id = parseInt(opt.old.id, 10);
    this.conference_id = parseInt(opt.old.conference_id, 10);
    this.activity_type_id = parseInt(opt.old.activity_type_id, 10);
  }

  async $beforeInsert() {
    if (!this.status) this.status = 'on';
  }

  // delete all schedules of activity with id
  async deleteSchedule() {
    const schedules = await Schedule.query().where('activity_id', this.id);

    if (schedules) {
      schedules.map(schedule => schedule.deletePersonalSchedule());
      await Schedule.query()
        .delete()
        .where('activity_id', this.id);
    }

    return schedules;
  }

  // delete all feedback of activity with id
  async deleteActivityFeedback() {
    const activityFeedback = await ActivityFeedback.query().where(
      'activity_id',
      this.id,
    );

    if (activityFeedback)
      await ActivityFeedback.query()
        .delete()
        .where('activity_id', this.id);
    return activityFeedback;
  }

  // delete all topic of activity with id
  async deleteActivityTopic() {
    const activityTopic = await ActivityTopic.query().where(
      'activity_id',
      this.id,
    );

    if (activityTopic)
      await ActivityTopic.query()
        .delete()
        .where('activity_id', this.id);
    return activityTopic;
  }

  async deleteAllRelationship() {
    this.deleteActivityFeedback();
    this.deleteActivityTopic();
    this.deleteSchedule();
  }
}
