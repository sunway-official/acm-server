import { mergeTypes } from 'merge-graphql-schemas';

import userTypes from './userTypes';
import roleTypes from './roleTypes';
import featureTypes from './featureTypes';
import defaultPermissionTypes from './defaultPermissionTypes';
import organizerDetailTypes from './organizerDetailTypes';
import globalTypes from './globalTypes';

const types = [
  userTypes,
  globalTypes,
  roleTypes,
  featureTypes,
  defaultPermissionTypes,
  organizerDetailTypes,
];

export default mergeTypes(types);
