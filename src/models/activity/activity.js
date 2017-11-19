import { Model } from 'objection';
import Schedule from '../schedule/schedule';
import ActivityFeedback from './activityFeedback';
import Question from '../questionAndAnswer/question';

export default class Activity extends Model {
  static tableName = 'activities';
  static jsonSchema = {
    type: 'object',
    required: ['conference_id', 'activity_type_id', 'title'],
    properties: {
      id: { type: 'integer' },
      conference_id: { type: 'integer' },
      title: { type: 'string', maxLength: '300' },
      status: {
        enum: ['on', 'off'],
        default: 'on',
      },
      description: { type: 'text' },
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

  // delete all question of activity with id
  async deleteQuestion() {
    const questions = await Question.query().where('activity_id', this.id);

    if (questions) {
      questions.map(question => question.deleteAnswer());
      await Question.query()
        .delete()
        .where('activity_id', this.id);
    }
    return questions;
  }

  async deleteAllRelationship() {
    this.deleteActivityFeedback();
    this.deleteSchedule();
    this.deleteQuestion();
  }
}
