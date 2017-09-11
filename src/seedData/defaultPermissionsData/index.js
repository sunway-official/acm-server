const featuresOfParticipant = require('./participantData');
const featuresOfSpeaker = require('./speakerData');
const featuresOfOrganizer = require('./organizerData');

const defaultPermissions = {
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
