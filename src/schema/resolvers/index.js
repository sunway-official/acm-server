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
];
export default mergeResolvers(resolvers);
