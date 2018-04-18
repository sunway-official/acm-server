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

// activity
import activity from './activity';

// staff
import staff from './staff';

import participant from './participant';

import topic from './topic';

import paper from './paper';

import review from './review';

import statistic from './statistic';

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
  ...topic,
  ...paper,
  ...review,
  staff,
  participant,
  statistic,
];
export default mergeResolvers(resolvers);
