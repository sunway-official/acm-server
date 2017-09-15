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

const models = {
  ...activity,
  ...authorization,
  ...conference,
  ...newsFeed,
  ...questionAndAnswer,
  ...schedule,
};

export default models;
