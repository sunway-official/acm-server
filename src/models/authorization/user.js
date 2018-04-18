import bcrypt from 'bcryptjs';
import { Model } from 'objection';

import config from '../../config';
import commonUtils from '../../utils/common';
import ActivityFeedback from '../activity/activityFeedback';
import ConferenceAttendee from '../conference/conferenceAttendee';
import ConferenceUserRelationship from '../conference/conferenceUserRelationship';
import OrganizerDetail from '../conference/organizerDetail';
import News from '../newsFeed/news';
import NewsComment from '../newsFeed/newsComment';
import NewsLike from '../newsFeed/newsLike';
import Answer from '../questionAndAnswer/answer';
import Question from '../questionAndAnswer/question';
import PersonalSchedule from '../schedule/personalSchedule';
import Permission from './permission';

const unique = require('objection-unique')({
  fields: ['email'],
  identifiers: ['id'],
});

export default class User extends unique(Model) {
  static tableName = 'users';
  static jsonSchema = {
    type: 'object',
    required: ['firstname', 'lastname', 'email', 'password', 'gender'],
    properties: {
      id: { type: 'number' },
      current_conference_id: { type: 'number' },
      firstname: { type: 'string', maxLength: '50' },
      lastname: { type: 'string', maxLength: '50' },
      email: {
        type: 'string',
        format: 'email',
        minLength: '5',
        maxLength: '100',
      },
      password: { type: 'string', pattern: commonUtils.passwordRegex.source },
      gender: {
        type: 'string',
        enum: ['male', 'female', 'unknown'],
        default: 'unknown',
      },
      dob: { type: 'string' },
      phone_number: {
        type: ['string', 'null'],
        maxLength: '12',
      },
      bio: {
        type: ['string', 'null'],
        maxLength: '200',
      },
      language: {
        type: ['string', 'null'],
        maxLength: '100',
      },
      avatar: {
        type: ['string', 'null'],
      },
      linkedin_id: {
        type: ['string', 'null'],
      },
      facebook_id: {
        type: ['string', 'null'],
      },
      twitter_id: {
        type: ['string', 'null'],
      },
      version_key: { type: 'string' },
      followers_count: { type: 'integer' },
      followings_count: { type: 'integer' },
    },
  };
  // eslint-disable-next-line class-methods-use-this
  $beforeValidate(jsonSchema, json) {
    const newJson = { ...json };
    if (json.dob) {
      newJson.dob = json.dob.toUTCString();
    }
    return newJson;
  }
  async $beforeInsert() {
    this.created_at = new Date();
    this.updated_at = new Date();

    this.password = await bcrypt.hash(this.password, config.saltFactor);
    this.version_key = await bcrypt.hash(
      commonUtils.randomStr(),
      config.saltFactor,
    );
  }

  async $beforeUpdate() {
    this.updated_at = new Date();
    if (this.password) {
      this.password = await bcrypt.hash(this.password, config.saltFactor);
      this.version_key = await bcrypt.hash(
        commonUtils.randomStr(),
        config.saltFactor,
      );
    }

    await Promise.all([
      ConferenceUserRelationship.query()
        .where('follower_id', this.id)
        .update({
          followers_firstname: this.firstname,
          followers_lastname: this.lastname,
          followers_avatar: this.avatar,
        }),
      ConferenceUserRelationship.query()
        .where('following_id', this.id)
        .update({
          followings_firstname: this.firstname,
          followings_lastname: this.lastname,
          followings_avatar: this.avatar,
        }),
    ]);
  }
  async checkPassword(password) {
    const passwordMatch = await bcrypt.compare(password, this.password);
    return passwordMatch;
  }
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, config.saltFactor);
  }

  // delete all permission of user with id
  async deletePermissions() {
    const permissions = await Permission.query().where('user_id', this.id);

    if (permissions) {
      await Permission.query()
        .delete()
        .where('user_id', this.id);
    }

    return permissions;
  }

  // delete all personal schedule of user with id
  async deletePersonalSchedule() {
    const personalSchedules = await PersonalSchedule.query().where(
      'user_id',
      this.id,
    );

    if (personalSchedules) {
      await PersonalSchedule.query()
        .delete()
        .where('user_id', this.id);
    }

    return personalSchedules;
  }

  // delete all organizer detail schedule of user with id
  async deleteOrganizerDetail() {
    const organizerDetail = await OrganizerDetail.query().where(
      'user_id',
      this.id,
    );

    if (organizerDetail) {
      organizerDetail.map(organizer => organizer.deleteAllRelationship());
      await OrganizerDetail.query()
        .delete()
        .where('user_id', this.id);
    }

    return organizerDetail;
  }

  // delete all conference attendee schedule of user with id
  async deleteConferenceAttendee() {
    const conferenceAttendee = await ConferenceAttendee.query().where(
      'user_id',
      this.id,
    );

    if (conferenceAttendee) {
      await ConferenceAttendee.query()
        .delete()
        .where('user_id', this.id);
    }

    return conferenceAttendee;
  }

  // delete all feedback of user with id
  async deleteActivityFeedback() {
    const activityFeedback = await ActivityFeedback.query().where(
      'user_id',
      this.id,
    );

    if (activityFeedback) {
      await ActivityFeedback.query()
        .delete()
        .where('user_id', this.id);
    }

    return activityFeedback;
  }

  // delete all question of user with id
  async deleteQuestion() {
    const questions = await Question.query().where('user_id', this.id);

    if (questions) {
      questions.map(question => question.deleteAnswer());

      await Question.query()
        .delete()
        .where('user_id', this.id);
    }

    return questions;
  }

  // delete all answers of user with id
  async deleteAnswer() {
    const answer = await Answer.query().where('user_id', this.id);

    if (answer)
      await Answer.query()
        .delete()
        .where('user_id', this.id);
    return answer;
  }

  // delete all news of user with id
  async deleteNews() {
    const allNews = await News.query().where('user_id', this.id);

    if (allNews) {
      allNews.map(news => news.deleteAllRelationship());

      await News.query()
        .delete()
        .where('user_id', this.id);
    }

    return allNews;
  }

  // delete all news commnent of user with id
  async deleteNewsComment() {
    const newsComment = await NewsComment.query().where('user_id', this.id);

    if (newsComment)
      await NewsComment.query()
        .delete()
        .where('user_id', this.id);
    return newsComment;
  }

  // delete all news like of user with id
  async deleteNewsLike() {
    const newsLike = await NewsLike.query().where('user_id', this.id);

    if (newsLike)
      await NewsLike.query()
        .delete()
        .where('user_id', this.id);
    return newsLike;
  }

  async deleteAllRelationship() {
    this.deletePermissions();
    this.deletePersonalSchedule();

    this.deleteOrganizerDetail();
    this.deleteConferenceAttendee();

    this.deleteActivityFeedback();
    this.deleteQuestion();
    this.deleteAnswer();

    this.deleteNewsComment();
    this.deleteNewsLike();
    this.deleteNews();
  }
}
