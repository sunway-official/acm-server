// authorization
import authorization from './authorization';

// activity
import activity from './activity';

// conference
import conference from './conference';

// newsFeed
import newsFeed from './newsFeed';

// questionAndAnswer
import questionAndAnswer from './questionAndAnswer';

// schedule
import schedule from './schedule';

// globalTypes
import globalTypes from './globalTypes';

// staff
import staff from './staff';

// participant
import participant from './participant';

import topic from './topic';

import paper from './paper';

import review from './review';

export default [
  ...authorization,
  ...activity,
  ...conference,
  ...newsFeed,
  ...questionAndAnswer,
  ...schedule,
  ...topic,
  ...paper,
  ...review,
  globalTypes,
  staff,
  participant,
];
