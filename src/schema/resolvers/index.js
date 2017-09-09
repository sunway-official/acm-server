import { mergeResolvers } from 'merge-graphql-schemas';
import GraphQLToolsTypes from 'graphql-tools-types';

import userResolvers from './userResolvers';
import permissionResolvers from './permissionResolvers';
import roleResolvers from './roleResolvers';
import featureResolvers from './featureResolvers';
import defaultPermissionResolvers from './defaultPermissionResolvers';
import organizerDetailResolvers from './organizerDetailResolvers';
import conferenceResolvers from './conferenceResolvers';

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
];
export default mergeResolvers(resolvers);
