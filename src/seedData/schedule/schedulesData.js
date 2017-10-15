const faker = require('faker');

const schedules = [
  {
    activity_id: faker.random.number({ min: 1, max: 20 }), // 0
    room_id: faker.random.number({ min: 1, max: 5 }),
    start: '2017-10-22 13:00',
    end: '2017-10-22 16:30',
  },
  {
    activity_id: faker.random.number({ min: 1, max: 20 }), // 1
    room_id: faker.random.number({ min: 1, max: 5 }),
    start: '2017-10-22 09:30',
    end: '2017-10-22 11:30',
  },
  {
    activity_id: faker.random.number({ min: 1, max: 20 }), // 2
    room_id: faker.random.number({ min: 1, max: 5 }),
    start: '2017-10-22 07:30',
    end: '2017-10-22 09:00',
  },
  {
    activity_id: faker.random.number({ min: 1, max: 20 }), // 0
    room_id: faker.random.number({ min: 1, max: 5 }),
    start: '2017-10-22 17:30',
    end: '2017-10-22 19:30',
  },
  {
    activity_id: faker.random.number({ min: 1, max: 20 }), // 0
    room_id: faker.random.number({ min: 1, max: 5 }),
    start: '2017-10-23 16:30',
    end: '2017-10-23 18:30',
  },
  {
    activity_id: faker.random.number({ min: 1, max: 20 }), // 0
    room_id: faker.random.number({ min: 1, max: 5 }),
    start: '2017-10-23 07:30',
    end: '2017-10-23 10:30',
  },
  {
    activity_id: faker.random.number({ min: 1, max: 20 }), // 0
    room_id: faker.random.number({ min: 1, max: 5 }),
    start: '2017-10-23 09:30',
    end: '2017-10-23 11:30',
  },
  {
    activity_id: faker.random.number({ min: 1, max: 20 }), // 1
    room_id: faker.random.number({ min: 1, max: 5 }),
    start: '2017-10-24 07:30',
    end: '2017-10-24 09:00',
  },
  {
    activity_id: faker.random.number({ min: 1, max: 20 }), // 0
    room_id: faker.random.number({ min: 1, max: 5 }),
    start: '2017-10-24 09:30',
    end: '2017-10-24 11:30',
  },

  {
    activity_id: faker.random.number({ min: 1, max: 20 }), // 1
    room_id: faker.random.number({ min: 1, max: 5 }),
    start: '2017-10-24 15:30',
    end: '2017-10-24 18:30',
  },
  {
    activity_id: faker.random.number({ min: 1, max: 20 }), // 1
    room_id: faker.random.number({ min: 1, max: 5 }),
    start: '2017-10-24 17:30',
    end: '2017-10-24 19:30',
  },
  {
    activity_id: faker.random.number({ min: 1, max: 20 }), // 2
    room_id: faker.random.number({ min: 1, max: 5 }),
    start: '2017-10-25 08:30',
    end: '2017-10-25 10:30',
  },
  {
    activity_id: faker.random.number({ min: 1, max: 20 }), // 2
    room_id: faker.random.number({ min: 1, max: 5 }),
    start: '2017-10-25 13:30',
    end: '2017-10-25 16:30',
  },
  {
    activity_id: faker.random.number({ min: 1, max: 20 }), // 2
    room_id: faker.random.number({ min: 1, max: 5 }),
    start: '2017-10-25 17:30',
    end: '2017-10-25 19:30',
  },
  {
    activity_id: faker.random.number({ min: 1, max: 20 }), // 2
    room_id: faker.random.number({ min: 1, max: 5 }),
    start: '2017-10-25 15:30',
    end: '2017-10-25 17:00',
  },
  {
    activity_id: faker.random.number({ min: 1, max: 20 }), // 2
    room_id: faker.random.number({ min: 1, max: 5 }),
    start: '2017-10-26 07:30',
    end: '2017-10-26 10:30',
  },
  {
    activity_id: faker.random.number({ min: 1, max: 20 }), // 2
    room_id: faker.random.number({ min: 1, max: 5 }),
    start: '2017-10-26 09:30',
    end: '2017-10-26 11:30',
  },
  {
    activity_id: faker.random.number({ min: 1, max: 20 }), // 1
    room_id: faker.random.number({ min: 1, max: 5 }),
    start: '2017-10-26 15:30',
    end: '2017-10-26 18:30',
  },
  {
    activity_id: faker.random.number({ min: 1, max: 20 }), // 2
    room_id: faker.random.number({ min: 1, max: 5 }),
    start: '2017-10-26 18:30',
    end: '2017-10-26 20:00',
  },
  {
    activity_id: faker.random.number({ min: 1, max: 20 }), // 2
    room_id: faker.random.number({ min: 1, max: 5 }),
    start: '2017-10-27 07:30',
    end: '2017-10-27 11:30',
  },
  {
    activity_id: faker.random.number({ min: 1, max: 20 }), // 2
    room_id: faker.random.number({ min: 1, max: 5 }),
    start: '2017-10-27 13:30',
    end: '2017-10-27 15:30',
  },
  {
    activity_id: faker.random.number({ min: 1, max: 20 }), // 2
    room_id: faker.random.number({ min: 1, max: 5 }),
    start: '2017-10-27 19:30',
    end: '2017-10-27 21:30',
  },
  {
    activity_id: faker.random.number({ min: 1, max: 20 }), // 2
    room_id: faker.random.number({ min: 1, max: 5 }),
    start: '2017-10-27 15:30',
    end: '2017-10-27 17:30',
  },
];

module.exports = schedules;
