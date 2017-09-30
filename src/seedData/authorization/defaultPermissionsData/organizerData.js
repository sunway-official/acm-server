const featuresOfSupporter = require('./supporterData');

const featuresOfOrganizer = [
  // mutation Activity
  {
    feature_id: 'insertActivity',
  },
  {
    feature_id: 'updateActivity',
  },
  {
    feature_id: 'deleteActivity',
  },

  // mutation Activity type
  {
    feature_id: 'insertActivityType',
  },
  {
    feature_id: 'updateActivityType',
  },
  {
    feature_id: 'deleteActivityType',
  },

  // delete user
  {
    feature_id: 'deleteUser',
  },

  // mutation Conference attendee
  {
    feature_id: 'insertConferenceAttendee',
  },
  {
    feature_id: 'updateConferenceAttendee',
  },
  {
    feature_id: 'deleteConferenceAttendee',
  },

  // mutation Conference
  {
    feature_id: 'insertConference',
  },
  {
    feature_id: 'updateConference',
  },
  {
    feature_id: 'deleteConference',
  },

  // mutation Organizer detail
  {
    feature_id: 'insertOrganizerDetail',
  },
  {
    feature_id: 'updateOrganizerDetail',
  },
  {
    feature_id: 'deleteOrganizerDetail',
  },

  // mutation Topics
  {
    feature_id: 'insertTopic',
  },
  {
    feature_id: 'updateTopic',
  },
  {
    feature_id: 'deleteTopic',
  },

  // query Staff in conference
  {
    feature_id: 'getAllStaffInConference',
  },

  // mutation Co-organizer detail
  {
    feature_id: 'insertCoOrganizerDetail',
  },
  {
    feature_id: 'updateCoOrganizerDetail',
  },
  {
    feature_id: 'deleteCoOrganizerDetail',
  },
];

module.exports = featuresOfOrganizer.concat(featuresOfSupporter);
