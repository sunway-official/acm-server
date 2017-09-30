const featuresOfParticipant = require('./participantData');
const featuresOfSpeaker = require('./speakerData');
const featuresOfOrganizer = require('./organizerData');
const featuresOfAuthor = require('./authorData');
const featuresOfModerator = require('./moderatorData');
const featuresOfSupporter = require('./supporterData');
const featuresOfTickerChecker = require('./ticketCheckerData');
const featuresOfReviewer = require('./reviewerData');

const defaultPermissions = {
  author: {
    role_id: 8,
    features: featuresOfAuthor,
  },
  reviewer: {
    role_id: 7,
    features: featuresOfReviewer,
  },
  ticketChecker: {
    role_id: 6,
    features: featuresOfTickerChecker,
  },
  participant: {
    role_id: 5,
    features: featuresOfParticipant,
  },
  supporter: {
    role_id: 4,
    features: featuresOfSupporter,
  },
  moderator: {
    role_id: 3,
    features: featuresOfModerator,
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
