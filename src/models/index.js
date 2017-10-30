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

const models = {
  ...activity,
  ...authorization,
  ...conference,
  ...newsFeed,
  ...questionAndAnswer,
  ...schedule,
  ...topic,
};

export default models;
