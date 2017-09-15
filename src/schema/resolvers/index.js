import { mergeResolvers } from 'merge-graphql-schemas';
import GraphQLToolsTypes from 'graphql-tools-types';

// authorization
import authorization from './authorization';

// conference
import conference from './conference';

// news feed
import newsFeed from './newsFeed';

// schedule
import schedule from './schedule';

// Question and Answers
import questionAndAnswer from './questionAndAnswer';

import activity from './activity';

const rootResolvers = {
  Date: GraphQLToolsTypes.Date({ name: 'Date' }),
};

const resolvers = [
  rootResolvers,
  ...authorization,
  ...conference,
  ...newsFeed,
  ...schedule,
  ...questionAndAnswer,
  ...activity,
];
export default mergeResolvers(resolvers);
