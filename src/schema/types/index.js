import { mergeTypes } from 'merge-graphql-schemas';

import userTypes from './userTypes';
import globalTypes from './globalTypes';

const types = [userTypes, globalTypes];
export default mergeTypes(types);
