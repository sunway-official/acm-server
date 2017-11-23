const papers = require('../paper/paperData');
const faker = require('faker');

// eslint-disable-next-line
const tempActivities = (conference_id, paper) => [
  {
    conference_id,
    paper_id: paper.id,
    title: paper.title,
    description: paper.abstract,
  },
  {
    conference_id,
    paper_id: paper.id,
    title: paper.title,
    description: paper.abstract,
  },
  {
    conference_id,
    paper_id: paper.id,
    title: paper.title,
    description: paper.abstract,
  },
  {
    conference_id,
    paper_id: paper.id,
    title: paper.title,
    description: paper.abstract,
  },
  {
    conference_id,
    paper_id: paper.id,
    title: paper.title,
    description: paper.abstract,
  },
  {
    conference_id,
    paper_id: paper.id,
    title: paper.title,
    description: paper.abstract,
  },
  {
    conference_id,
    paper_id: paper.id,
    title: paper.title,
    description: paper.abstract,
  },
  {
    conference_id,
    paper_id: paper.id,
    title: paper.title,
    description: paper.abstract,
  },
  {
    conference_id,
    paper_id: paper.id,
    title: paper.title,
    description: paper.abstract,
  },
  {
    conference_id,
    paper_id: paper.id,
    title: paper.title,
    description: paper.abstract,
  },
  {
    conference_id,
    paper_id: paper.id,
    title: paper.title,
    description: paper.abstract,
  },
  {
    conference_id,
    paper_id: paper.id,
    title: paper.title,
    description: paper.abstract,
  },
  {
    conference_id,
    paper_id: paper.id,
    title: paper.title,
    description: paper.abstract,
  },
];

let activities = [];

for (let i = 1; i < 7; i += 1) {
  const index = faker.random.number({ min: 1, max: 10 });
  const paper = papers[index - 1];
  activities = activities.concat(tempActivities(i, paper));
}

module.exports = activities;
