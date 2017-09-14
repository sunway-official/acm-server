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
import activityTypeResolvers from './activityTypeResolvers';
import activityFeedbackResolvers from './activityFeedbackResolvers';
import activityTopicResolvers from './activityTopicResolvers';
import activityResolvers from './activityResolvers';

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
  activityTypeResolvers,
  activityFeedbackResolvers,
  activityTopicResolvers,
  activityResolvers,
];
export default mergeResolvers(resolvers);
