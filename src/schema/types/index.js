import { mergeTypes } from 'merge-graphql-schemas';

import userTypes from './userTypes';
import globalTypes from './globalTypes';
import permissionTypes from './permissionTypes';

const types = [userTypes, globalTypes, permissionTypes];
export default mergeTypes(types);
