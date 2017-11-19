// activity
import activity from './activity';

// authorization
import authorization from './authorization';

// conference
import conference from './conference';

// newsFeed
import newsFeed from './newsFeed';

// questionAndAnswer
import questionAndAnswer from './questionAndAnswer';

// schedule
import schedule from './schedule';

// topic
import topic from './topic';

import paper from './paper';

const models = {
  ...activity,
  ...authorization,
  ...conference,
  ...newsFeed,
  ...questionAndAnswer,
  ...schedule,
  ...topic,
  ...paper,
};

export default models;
