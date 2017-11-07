const faker = require('faker');

const modifyDate = (addDate, number, add) => {
  const date = new Date();
  date.setDate(date.getDate() + addDate);
  date.setHours(7 * number + add);
  return date;
};

const schedules = [];

for (let i = 0; i < 3; i += 1) {
  for (let j = 0; j < 3; j += 1) {
    const number = faker.random.number({ min: 1, max: 2 });
    schedules.push({
      activity_id: faker.random.number({ min: 1, max: 20 }), // 2
      room_id: faker.random.number({ min: 1, max: 5 }),
      conference_id: 1,
      start: modifyDate(i, number, faker.random.number({ min: 0, max: 2 })),
      end: modifyDate(i, number, faker.random.number({ min: 4, max: 5 })),
    });
  }
}

module.exports = schedules;
