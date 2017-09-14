import User from './user';
import Permission from './permission';
import Role from './role';
import Feature from './feature';
import DefaultPermission from './defaultPermission';
import OrganizerDetail from './organizerDetail';
import Conference from './conference';
import Address from './address';
import Topic from './topic';
import ConferenceTopic from './conferenceTopic';
import ConferenceAttendee from './conferenceAttendee';
import News from './news';
import NewsPhoto from './newsPhoto';
import NewsLike from './newsLike';
import NewsComment from './newsComment';
import Question from './question';
import Answer from './answer';

const models = {
  User,
  Role,
  Feature,
  DefaultPermission,
  Permission,
  OrganizerDetail,
  Conference,
  Address,
  Topic,
  ConferenceTopic,
  ConferenceAttendee,
  News,
  NewsPhoto,
  NewsLike,
  NewsComment,
  Question,
  Answer,
};

export default models;
