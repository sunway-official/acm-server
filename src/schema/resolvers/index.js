import { mergeResolvers } from 'merge-graphql-schemas';
import GraphQLToolsTypes from 'graphql-tools-types';

import userResolvers from './userResolvers';
import permissionResolvers from './permissionResolvers';
import roleResolvers from './roleResolvers';
import featureResolvers from './featureResolvers';
import defaultPermissionResolvers from './defaultPermissionResolvers';
import organizerDetailResolvers from './organizerDetailResolvers';
import conferenceResolvers from './conferenceResolvers';
import addressResolvers from './addressResolvers';
import topicResolvers from './topicResolvers';
import conferenceTopicResolvers from './conferenceTopicResolvers';
import conferenceAttendeeResolvers from './conferenceAttendeeResolvers';
import newsResolvers from './newsResolvers';
import newsPhotoResolvers from './newsPhotoResolvers';
import newsLikeResolvers from './newsLikeResolvers';
import newsCommentResolvers from './newsCommentResolvers';
import questionResolvers from './questionResolvers';
import answerResolvers from './answerResolvers';
import activityTypeResolvers from './activityTypeResolvers';
import activityFeedbackResolvers from './activityFeedbackResolvers';
import activityTopicResolvers from './activityTopicResolvers';
import activityResolvers from './activityResolvers';
import roomResolves from './roomResolves';
import scheduleResolvers from './scheduleResolvers';
import personalScheduleResolves from './personalScheduleResolves';

const rootResolvers = {
  Date: GraphQLToolsTypes.Date({ name: 'Date' }),
};

const resolvers = [
  rootResolvers,
  userResolvers,
  roleResolvers,
  featureResolvers,
  defaultPermissionResolvers,
  permissionResolvers,
  organizerDetailResolvers,
  conferenceResolvers,
  addressResolvers,
  topicResolvers,
  conferenceTopicResolvers,
  conferenceAttendeeResolvers,
  newsResolvers,
  newsPhotoResolvers,
  newsLikeResolvers,
  newsCommentResolvers,
  questionResolvers,
  answerResolvers,
  activityTypeResolvers,
  activityFeedbackResolvers,
  activityTopicResolvers,
  activityResolvers,
  roomResolves,
  scheduleResolvers,
  personalScheduleResolves,
];
export default mergeResolvers(resolvers);
