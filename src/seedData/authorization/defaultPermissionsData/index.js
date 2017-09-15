const featuresOfParticipant = require('./participantData');
const featuresOfSpeaker = require('./speakerData');
const featuresOfOrganizer = require('./organizerData');
const featuresOfAuthor = require('./authorData');

const defaultPermissions = {
  author: {
    role_id: 8,
    features: featuresOfAuthor,
  },
  participant: {
    role_id: 5,
    features: featuresOfParticipant,
  },
  speaker: {
    role_id: 2,
    features: featuresOfSpeaker,
  },
  organizer: {
    role_id: 1,
    features: featuresOfOrganizer,
  },
};

module.exports = defaultPermissions;
