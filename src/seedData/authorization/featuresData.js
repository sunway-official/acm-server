// const features = [
//   // query Activity feeback
//   {
//     id: 'getAllActivityFeedback',
//   },
//   {
//     id: 'getActivityFeedbackByID',
//   },
//   {
//     id: 'getAllActivityFeedbackByUserID',
//   },
//   {
//     id: 'getAllActivityFeedbackByActivityID',
//   },
//   {
//     id: 'getAllActivityFeedbackByActivityIDUserID',
//   },

//   // mutation Activity feeback
//   {
//     id: 'insertActivityFeedback',
//   },
//   {
//     id: 'updateActivityFeedback',
//   },
//   {
//     id: 'deleteActivityFeedback',
//   },

//   // query Papers topics
//   {
//     id: 'getAllPapersTopics',
//   },
//   {
//     id: 'getTopicsByPaperID',
//   },

//   // mutation Papers topics
//   {
//     id: 'insertPaperTopic',
//   },
//   {
//     id: 'updateTopicOfPaper',
//   },
//   {
//     id: 'deletePaperTopic',
//   },

//   // query Activity
//   {
//     id: 'getAllActivities',
//   },
//   {
//     id: 'getActivityByID',
//   },
//   {
//     id: 'getActivitiesByConferenceID',
//   },

//   // mutation Activity
//   {
//     id: 'insertActivity',
//   },
//   {
//     id: 'updateActivity',
//   },
//   {
//     id: 'deleteActivity',
//   },

//   // query Activity types
//   {
//     id: 'getAllActivityTypes',
//   },
//   {
//     id: 'getActivityTypeByID',
//   },

//   // mutation Activity type
//   {
//     id: 'insertActivityType',
//   },
//   {
//     id: 'updateActivityType',
//   },
//   {
//     id: 'deleteActivityType',
//   },

//   // delete user
//   {
//     id: 'deleteUser',
//   },

//   // query Conference attendee
//   {
//     id: 'getAllConferenceAttendees',
//   },
//   {
//     id: 'getConferenceAttendeeByID',
//   },

//   // mutation Conference attendee
//   {
//     id: 'insertConferenceAttendee',
//   },
//   {
//     id: 'updateConferenceAttendee',
//   },
//   {
//     id: 'deleteConferenceAttendee',
//   },

//   // query Conference
//   {
//     id: 'getAllConferences',
//   },
//   {
//     id: 'getConferenceByID',
//   },
//   {
//     id: 'getConferenceByOrganizerDetailID',
//   },
//   {
//     id: 'getConferenceByAddressID',
//   },
//   {
//     id: 'getConferenceByUserID',
//   },

//   // mutation Conference
//   {
//     id: 'insertConference',
//   },
//   {
//     id: 'updateConference',
//   },
//   {
//     id: 'deleteConference',
//   },

//   // query Organizer detail
//   {
//     id: 'getAllOrganizerDetails',
//   },
//   {
//     id: 'getOrganizerDetailByID',
//   },
//   {
//     id: 'getOrganizerDetailByUserID',
//   },

//   // mutation Organizer detail
//   {
//     id: 'insertOrganizerDetail',
//   },
//   {
//     id: 'updateOrganizerDetail',
//   },
//   {
//     id: 'deleteOrganizerDetail',
//   },

//   // query Topics
//   {
//     id: 'getAllTopics',
//   },
//   {
//     id: 'getTopicByID',
//   },

//   // mutation Topics
//   {
//     id: 'insertTopic',
//   },
//   {
//     id: 'updateTopic',
//   },
//   {
//     id: 'deleteTopic',
//   },

//   // query News comment
//   {
//     id: 'getAllNewsComments',
//   },
//   {
//     id: 'getNewsCommentByID',
//   },
//   {
//     id: 'getNewsCommentByNewsID',
//   },
//   {
//     id: 'getNewsCommentByUserID',
//   },

//   // mutation News comment
//   {
//     id: 'insertNewsComment',
//   },
//   {
//     id: 'updateNewsComment',
//   },
//   {
//     id: 'deleteNewsComment',
//   },

//   // query News like
//   {
//     id: 'getAllNewsLikes',
//   },
//   {
//     id: 'getNewsLikeByID',
//   },

//   // mutation News like
//   {
//     id: 'insertNewsLike',
//   },
//   {
//     id: 'updateNewsLike',
//   },
//   {
//     id: 'deleteNewsLike',
//   },

//   // query News photo
//   {
//     id: 'getAllNewsPhotos',
//   },
//   {
//     id: 'getNewsPhotoByID',
//   },
//   {
//     id: 'getNewsPhotoByNewsID',
//   },

//   // mutation News photo
//   {
//     id: 'insertNewsPhoto',
//   },
//   {
//     id: 'updateNewsPhoto',
//   },
//   {
//     id: 'deleteNewsPhoto',
//   },

//   // query News
//   {
//     id: 'getAllNews',
//   },
//   {
//     id: 'getNewsByID',
//   },
//   {
//     id: 'getNewsByUserID',
//   },
//   {
//     id: 'getNewsByConferenceID',
//   },

//   // mutation News
//   {
//     id: 'insertNews',
//   },
//   {
//     id: 'updateNews',
//   },
//   {
//     id: 'deleteNews',
//   },

//   // query Answer
//   {
//     id: 'getAllAnswers',
//   },
//   {
//     id: 'getAnswerByID',
//   },
//   {
//     id: 'getAnswerByQuestionID',
//   },
//   {
//     id: 'getAnswerByUserID',
//   },

//   // mutation Answer
//   {
//     id: 'insertAnswer',
//   },
//   {
//     id: 'updateAnswer',
//   },
//   {
//     id: 'deleteAnswer',
//   },

//   // query Question
//   {
//     id: 'getAllQuestions',
//   },
//   {
//     id: 'getQuestionByID',
//   },
//   {
//     id: 'getQuestionByActivityID',
//   },
//   {
//     id: 'getQuestionByUserID',
//   },

//   // mutation Question
//   {
//     id: 'insertQuestion',
//   },
//   {
//     id: 'updateQuestion',
//   },
//   {
//     id: 'deleteQuestion',
//   },

//   // query Personal schedule
//   {
//     id: 'getAllPersonalSchedules',
//   },
//   {
//     id: 'getPersonalScheduleByID',
//   },

//   // mutation Personal schedule
//   {
//     id: 'insertPersonalSchedule',
//   },
//   {
//     id: 'updatePersonalSchedule',
//   },
//   {
//     id: 'deletePersonalSchedule',
//   },

//   // query Room
//   {
//     id: 'getAllRooms',
//   },
//   {
//     id: 'getRoomByID',
//   },

//   // mutation Room
//   {
//     id: 'insertRoom',
//   },
//   {
//     id: 'updateRoom',
//   },
//   {
//     id: 'deleteRoom',
//   },

//   // query Schedule
//   {
//     id: 'getAllSchedules',
//   },
//   {
//     id: 'getScheduleByID',
//   },

//   // mutation Schedule
//   {
//     id: 'insertSchedule',
//   },
//   {
//     id: 'updateSchedule',
//   },
//   {
//     id: 'deleteSchedule',
//   },

//   // query Staff in conference
//   {
//     id: 'getAllStaffInConference',
//   },

//   // query Co-organizer details
//   {
//     id: 'getAllCoOrganizerDetails',
//   },
//   {
//     id: 'getCoOrganizerDetailByID',
//   },

//   // mutation Co-organizer detail
//   {
//     id: 'insertCoOrganizerDetail',
//   },
//   {
//     id: 'updateCoOrganizerDetail',
//   },
//   {
//     id: 'deleteCoOrganizerDetail',
//   },
// ];

const features = [
  {
    id: 'deleteCoOrganizerDetail',
  },
];

module.exports = features;
