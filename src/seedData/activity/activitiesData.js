const papers = require('../paper/paperData');

// eslint-disable-next-line
const tempActivities = (conference_id, index, paper) => [
  {
    conference_id,
    paper_id: 1,
    title: papers[0].title,
    description: papers[0].abstract,
  },
  {
    conference_id,
    paper_id: 2,
    title: papers[1].title,
    description: papers[1].abstract,
  },
  {
    conference_id,
    paper_id: 3,
    title: papers[2].title,
    description: papers[2].abstract,
  },
  {
    conference_id,
    paper_id: 4,
    title: papers[3].title,
    description: papers[3].abstract,
  },
  {
    conference_id,
    paper_id: 5,
    title: papers[4].title,
    description: papers[4].abstract,
  },
  {
    conference_id,
    paper_id: 6,
    title: papers[5].title,
    description: papers[5].abstract,
  },
  {
    conference_id,
    paper_id: 7,
    title: papers[6].title,
    description: papers[6].abstract,
  },
  {
    conference_id,
    paper_id: 8,
    title: papers[7].title,
    description: papers[7].abstract,
  },
  {
    conference_id,
    paper_id: 9,
    title: papers[8].title,
    description: papers[8].abstract,
  },
  {
    conference_id,
    paper_id: 10,
    title: papers[9].title,
    description: papers[9].abstract,
  },
  {
    conference_id,
    paper_id: 11,
    title: papers[10].title,
    description: papers[10].abstract,
  },
  {
    conference_id,
    paper_id: 12,
    title: papers[11].title,
    description: papers[11].abstract,
  },
  {
    conference_id,
    paper_id: 13,
    title: papers[12].title,
    description: papers[12].abstract,
  },
];

let activities = [];

activities = activities.concat(tempActivities(1, papers));

module.exports = activities;
