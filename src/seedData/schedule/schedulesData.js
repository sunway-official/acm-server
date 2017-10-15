const faker = require('faker');

const schedules = [
  {
    activity_id: faker.random.number({ min: 1, max: 20 }), // 0
    room_id: faker.random.number({ min: 1, max: 5 }),
    start: '2017-10-22 13:30',
    end: '2017-10-22 15:30',
  },
  {
    activity_id: faker.random.number({ min: 1, max: 20 }), // 1
    room_id: faker.random.number({ min: 1, max: 5 }),
    start: '2017-10-22 08:30',
    end: '2017-10-22 11:30',
  },
  {
    activity_id: faker.random.number({ min: 1, max: 20 }), // 2
    room_id: faker.random.number({ min: 1, max: 5 }),
    start: '2017-10-22 07:30',
    end: '2017-10-22 09:30',
  },
  {
    activity_id: faker.random.number({ min: 1, max: 20 }), // 0
    room_id: faker.random.number({ min: 1, max: 5 }),
    start: '2017-10-22 17:30',
    end: '2017-10-22 19:30',
  },
  {
    activity_id: faker.random.number({ min: 1, max: 20 }), // 2
    room_id: faker.random.number({ min: 1, max: 5 }),
    start: '2017-10-22 07:30',
    end: '2017-10-22 09:30',
  },
  {
    activity_id: faker.random.number({ min: 1, max: 20 }), // 0
    room_id: faker.random.number({ min: 1, max: 5 }),
    start: '2017-10-22 13:30',
    end: '2017-10-22 15:30',
  },
  {
    activity_id: faker.random.number({ min: 1, max: 20 }), // 2
    room_id: faker.random.number({ min: 1, max: 5 }),
    start: '2017-10-22 15:30',
    end: '2017-10-22 17:30',
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
    end: '2017-10-23 09:30',
  },
  {
    activity_id: faker.random.number({ min: 1, max: 20 }), // 0
    room_id: faker.random.number({ min: 1, max: 5 }),
    start: '2017-10-23 08:30',
    end: '2017-10-23 10:30',
  },
  {
    activity_id: faker.random.number({ min: 1, max: 20 }), // 0
    room_id: faker.random.number({ min: 1, max: 5 }),
    start: '2017-10-23 14:00',
    end: '2017-10-23 16:30',
  },
  {
    activity_id: faker.random.number({ min: 1, max: 20 }), // 0
    room_id: faker.random.number({ min: 1, max: 5 }),
    start: '2017-10-24 16:30',
    end: '2017-10-24 18:30',
  },
  {
    activity_id: faker.random.number({ min: 1, max: 20 }), // 0
    room_id: faker.random.number({ min: 1, max: 5 }),
    start: '2017-10-24 09:00',
    end: '2017-10-24 11:30',
  },
  {
    activity_id: faker.random.number({ min: 1, max: 20 }), // 1
    room_id: faker.random.number({ min: 1, max: 5 }),
    start: '2017-10-24 17:30',
    end: '2017-10-24 19:30',
  },
  {
    activity_id: faker.random.number({ min: 1, max: 20 }), // 1
    room_id: faker.random.number({ min: 1, max: 5 }),
    start: '2017-10-24 07:30',
    end: '2017-10-24 09:30',
  },
  {
    activity_id: faker.random.number({ min: 1, max: 20 }), // 1
    room_id: faker.random.number({ min: 1, max: 5 }),
    start: '2017-10-24 15:30',
    end: '2017-10-24 18:30',
  },
  {
    activity_id: faker.random.number({ min: 1, max: 20 }), // 2
    room_id: faker.random.number({ min: 1, max: 5 }),
    start: '2017-10-25 07:30',
    end: '2017-10-25 09:00',
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
    start: '2017-10-25 07:00',
    end: '2017-10-25 10:30',
  },
  {
    activity_id: faker.random.number({ min: 1, max: 20 }), // 2
    room_id: faker.random.number({ min: 1, max: 5 }),
    start: '2017-10-25 08:30',
    end: '2017-10-25 12:30',
  },
  {
    activity_id: faker.random.number({ min: 1, max: 20 }), // 2
    room_id: faker.random.number({ min: 1, max: 5 }),
    start: '2017-10-25 15:30',
    end: '2017-10-25 17:30',
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
    activity_id: faker.random.number({ min: 1, max: 20 }), // 2
    room_id: faker.random.number({ min: 1, max: 5 }),
    start: '2017-10-26 07:30',
    end: '2017-10-26 11:30',
  },
  {
    activity_id: faker.random.number({ min: 1, max: 20 }), // 2
    room_id: faker.random.number({ min: 1, max: 5 }),
    start: '2017-10-26 13:30',
    end: '2017-10-26 15:30',
  },
  {
    activity_id: faker.random.number({ min: 1, max: 20 }), // 2
    room_id: faker.random.number({ min: 1, max: 5 }),
    start: '2017-10-26 13:30',
    end: '2017-10-26 16:30',
  },
];

module.exports = schedules;
