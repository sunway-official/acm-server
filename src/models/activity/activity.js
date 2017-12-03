import { Model } from 'objection';
import Schedule from '../schedule/schedule';
import ActivityFeedback from './activityFeedback';
import Question from '../questionAndAnswer/question';

export default class Activity extends Model {
  static tableName = 'activities';
  static jsonSchema = {
    type: 'object',
    properties: {
      id: { type: 'integer' },
      conference_id: { type: 'integer' },
      paper_id: { type: 'integer' },
      title: { type: 'string', maxLength: '300' },
      description: { type: 'text' },
    },
  };

  async $beforeValidate(opt) {
    this.id = parseInt(opt.old.id, 10);
    this.conference_id = parseInt(opt.old.conference_id, 10);
    this.paper_id = parseInt(opt.old.paper_id, 10);
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
