import { mergeResolvers } from 'merge-graphql-schemas';
import GraphQLToolsTypes from 'graphql-tools-types';

import userResolvers from './userResolvers';
import roleResolvers from './roleResolvers';
import featureResolvers from './featureResolvers';
import defaultPermissionResolvers from './defaultPermissionResolvers';
import organizerDetailResolvers from './organizerDetailResolvers';

const rootResolvers = {
  Date: GraphQLToolsTypes.Date({ name: 'Date' }),
};

const resolvers = [
  rootResolvers,
  userResolvers,
  roleResolvers,
  featureResolvers,
  defaultPermissionResolvers,
  organizerDetailResolvers,
];
export default mergeResolvers(resolvers);
