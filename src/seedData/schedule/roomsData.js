const faker = require('faker');

const roomsTemplates = conference_id => [
  {
    name: 'P101', // 0
    seats: 20,
    conference_id,
  },
  {
    name: 'P102', // 1
    seats: 40,
    conference_id,
  },
  {
    name: 'P201', // 2
    seats: 30,
    conference_id,
  },
  {
    name: 'P202', // 3
    seats: 30,
    conference_id,
  },
  {
    name: 'P301', // 3
    seats: 30,
    conference_id,
  },
  {
    name: 'P302', // 4
    seats: 40,
    conference_id,
  },
  {
    name: 'P401', // 4
    seats: 40,
    conference_id,
  },
  {
    name: 'P402', // 4
    seats: 40,
    conference_id,
  },
];

let data = [];
for (let i = 1; i < 3; i += 1) {
  data = data.concat(roomsTemplates(i));
}

module.exports = data;
