import { Model } from 'objection';
import ConferenceAttendee from './conferenceAttendee';
import ConferenceTopic from './conferenceTopic';
import News from './news';
import Activity from './activity';

export default class Conference extends Model {
  static tableName = 'conferences';
  static jsonSchema = {
    type: 'object',
    description: 'A conference',
    properties: {
      id: { type: 'integer' },
      organizer_detail_id: { type: 'integer' },
      address_id: { type: 'integer' },
      user_id: { type: 'integer' },
      title: { type: 'string', maxLength: '100' },
      description: { type: 'string', maxLength: '500' },
      bg_image: { type: 'string', maxLength: '300' },
    },
  };

  async $beforeValidate(opt) {
    this.id = parseInt(opt.old.id, 10);
    this.organizer_detail_id = parseInt(opt.old.organizer_detail_id, 10);
    this.address_id = parseInt(opt.old.address_id, 10);
    this.user_id = parseInt(opt.old.user_id, 10);
  }
  async $beforeInsert() {
    this.start_date = new Date().toISOString();
    this.end_date = new Date().toISOString();
  }

  async $beforeUpdate() {
    this.start_date = new Date().toISOString();
    this.end_date = new Date().toISOString();
  }
  // delete all conference topic of conference with conference id
  async deleteConferenceTopic() {
    const conferenceTopics = await ConferenceTopic.query().where(
      'conference_id',
      this.id,
    );

    if (conferenceTopics) {
      await ConferenceTopic.query()
        .delete()
        .where('conference_id', this.id);
    }

    return conferenceTopics;
  }

  // delete all conference attendees of activity with id
  async deleteConferenceAttendee() {
    const conferenceAttendee = await ConferenceAttendee.query().where(
      'conference_id',
      this.id,
    );

    if (conferenceAttendee)
      await ConferenceAttendee.query()
        .delete()
        .where('conference_id', this.id);
    return conferenceAttendee;
  }

  // delete all topic of activity with id
  async deleteNews() {
    const news = await News.query().where('conference_id', this.id);

    if (news)
      await News.query()
        .delete()
        .where('conference_id', this.id);
    return news;
  }

  // delete all topic of activity with id
  async deleteActivity() {
    const activity = await Activity.query().where('conference_id', this.id);

    if (activity)
      await Activity.query()
        .delete()
        .where('conference_id', this.id);
    return activity;
  }

  async deleteAllRelationship() {
    this.deleteConferenceTopic();
    this.deleteConferenceAttendee();
    this.deleteNews();
    this.deleteActivity();
  }
}
