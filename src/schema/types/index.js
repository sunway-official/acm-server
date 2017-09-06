import { mergeTypes } from 'merge-graphql-schemas';

import userTypes from './userTypes';
import roleTypes from './roleTypes';
import featureTypes from './featureTypes';
import defaultPermissionTypes from './defaultPermissionTypes';
import globalTypes from './globalTypes';

const types = [
  userTypes,
  globalTypes,
  roleTypes,
  featureTypes,
  defaultPermissionTypes,
];
export default mergeTypes(types);
