const featuresOfParticipant = require('./participantData');

const featuresOfSupporter = [
  // query Activity feeback
  {
    feature_id: 'getAllActivityFeedback',
  },
  {
    feature_id: 'getActivityFeedbackByID',
  },
  {
    feature_id: 'getAllActivityFeedbackByUserID',
  },
  {
    feature_id: 'getAllActivityFeedbackByActivityID',
  },
  {
    feature_id: 'getAllActivityFeedbackByActivityIDUserID',
  },

  // query News
  {
    feature_id: 'getNewsByUserID',
  },
  {
    feature_id: 'getNewsByConferenceID',
  },

  // query Answer
  {
    feature_id: 'getAllAnswers',
  },
  {
    feature_id: 'getAnswerByID',
  },
  {
    feature_id: 'getAnswerByQuestionID',
  },
  {
    feature_id: 'getAnswerByUserID',
  },

  // mutation Answer
  {
    feature_id: 'insertAnswer',
  },
  {
    feature_id: 'updateAnswer',
  },
  {
    feature_id: 'deleteAnswer',
  },

  // query Question
  {
    feature_id: 'getAllQuestions',
  },
  {
    feature_id: 'getQuestionByID',
  },
  {
    feature_id: 'getQuestionByActivityID',
  },
  {
    feature_id: 'getQuestionByUserID',
  },

  // query Room
  {
    feature_id: 'getAllRooms',
  },
  {
    feature_id: 'getRoomByID',
  },

  // mutation Room
  {
    feature_id: 'insertRoom',
  },
  {
    feature_id: 'updateRoom',
  },
  {
    feature_id: 'deleteRoom',
  },

  // mutation Schedule
  {
    feature_id: 'insertSchedule',
  },
  {
    feature_id: 'updateSchedule',
  },
  {
    feature_id: 'deleteSchedule',
  },
];

module.exports = featuresOfSupporter.concat(featuresOfParticipant);
