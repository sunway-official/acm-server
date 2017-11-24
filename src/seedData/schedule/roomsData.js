const faker = require('faker');

const rooms = [
  {
    name: 'P101', // 0
    seats: 20,
    status: faker.random.arrayElement(['on', 'off']),
    conference_id: faker.random.number({ min: 1, max: 3 }),
  },
  {
    name: 'P102', // 1
    seats: 40,
    status: faker.random.arrayElement(['on', 'off']),
    conference_id: faker.random.number({ min: 1, max: 2 }),
  },
  {
    name: 'P201', // 2
    seats: 30,
    conference_id: faker.random.number({ min: 1, max: 2 }),
  },
  {
    name: 'P202', // 3
    seats: 30,
    conference_id: faker.random.number({ min: 1, max: 2 }),
  },
  {
    name: 'P301', // 3
    seats: 30,
    conference_id: faker.random.number({ min: 1, max: 2 }),
  },
  {
    name: 'P302', // 4
    seats: 40,
    status: faker.random.arrayElement(['on', 'off']),
    conference_id: faker.random.number({ min: 1, max: 2 }),
  },
  {
    name: 'P401', // 4
    seats: 40,
    status: faker.random.arrayElement(['on', 'off']),
    conference_id: faker.random.number({ min: 1, max: 2 }),
  },
  {
    name: 'P402', // 4
    seats: 40,
    status: faker.random.arrayElement(['on', 'off']),
    conference_id: faker.random.number({ min: 1, max: 2 }),
  },
];

module.exports = rooms;
