import { Model } from 'objection';
import Topic from '../topic/topic';
import ConferenceAttendee from './conferenceAttendee';
import News from '../newsFeed/news';
import Activity from '../activity/activity';
import CoOrganizerDetail from './coOrganizerDetail';
import OrganizerDetail from './organizerDetail';
import Category from './category';

export default class Conference extends Model {
  static tableName = 'conferences';
  static jsonSchema = {
    type: 'object',
    required: ['organizer_detail_id', 'address_id', 'user_id', 'title'],
    description: 'A conference',
    properties: {
      id: { type: 'integer' },
      organizer_detail_id: { type: 'integer' },
      category_id: { type: 'integer' },
      category_name: { type: 'string', maxLength: '100' },
      address_id: { type: 'integer' },
      user_id: { type: 'integer' },
      title: { type: 'string', maxLength: '100' },
      description: { type: 'text' },
      bg_image: { type: 'string', maxLength: '300' },
      start_date: { type: ['string', 'null'] },
      end_date: { type: ['string', 'null'] },
      dl_submit_abstract: { type: ['string', 'null'] },
      dl_review_abstract: { type: ['string', 'null'] },
      dl_release_abstract: { type: ['string', 'null'] },
      dl_re_submit_abstract: { type: ['string', 'null'] },
      dl_re_review_abstract: { type: ['string', 'null'] },
      dl_release_final_abstract: { type: ['string', 'null'] },
      dl_submit_paper: { type: ['string', 'null'] },
      dl_review_paper: { type: ['string', 'null'] },
      dl_release_paper: { type: ['string', 'null'] },
      dl_re_submit_paper: { type: ['string', 'null'] },
      dl_re_review_paper: { type: ['string', 'null'] },
      dl_release_final_paper: { type: ['string', 'null'] },
      dl_registration: { type: ['string', 'null'] },
    },
  };

  async $beforeValidate(opt) {
    this.id = parseInt(opt.old.id, 10);
    this.organizer_detail_id = parseInt(opt.old.organizer_detail_id, 10);
    this.address_id = parseInt(opt.old.address_id, 10);
    this.user_id = parseInt(opt.old.user_id, 10);
    this.category_id = parseInt(opt.old.category_id, 10);
  }

  async $beforeInsert() {
    this.created_at = new Date();
    this.updated_at = new Date();
    if (this.organizer_detail_id) {
      const organizerDetail = await OrganizerDetail.query().findById(
        this.organizer_detail_id,
      );

      if (organizerDetail) {
        this.user_id = organizerDetail.user_id;
      }
    }

    if (this.category_id) {
      const category = await Category.query().findById(this.category_id);

      if (category) {
        this.category_name = category.name;
      }
    }
  }

  async $beforeUpdate() {
    this.updated_at = new Date();
    if (this.organizer_detail_id) {
      const organizerDetail = await OrganizerDetail.query().findById(
        this.organizer_detail_id,
      );

      if (organizerDetail) {
        this.user_id = organizerDetail.user_id;
      }
    }

    if (this.category_id) {
      const category = await Category.query().findById(this.category_id);

      if (category) {
        this.category_name = category.name;
      }
    }
  }

  // delete all topics of conference with id
  async deleteTopics() {
    const topics = await Topic.query().where('conference_id', this.id);

    if (topics)
      await Topic.query()
        .delete()
        .where('conference_id', this.id);
    return topics;
  }

  // delete all conference attendees of conference with id
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

  // delete all news of conference with id
  async deleteNews() {
    const news = await News.query().where('conference_id', this.id);

    if (news) {
      news.map(newsDelete => newsDelete.deleteAllRelationship());
      await News.query()
        .delete()
        .where('conference_id', this.id);
    }
    return news;
  }

  // delete all activities of conference with id
  async deleteActivity() {
    const activities = await Activity.query().where('conference_id', this.id);

    if (activities) {
      activities.map(activity => activity.deleteAllRelationship());
      await Activity.query()
        .delete()
        .where('conference_id', this.id);
    }
    return activities;
  }

  // delete all activities of conference with id
  async deleteCoOrganizer() {
    const coOrganizers = await CoOrganizerDetail.query().where(
      'conference_id',
      this.id,
    );

    if (coOrganizers) {
      await CoOrganizerDetail.query()
        .delete()
        .where('conference_id', this.id);
    }
    return coOrganizers;
  }

  async deleteAllRelationship() {
    this.deleteTopics();
    this.deleteConferenceAttendee();
    this.deleteNews();
    this.deleteActivity();
    this.deleteCoOrganizer();
  }
}
