const bcrypt = require('bcryptjs');

const randomStr = () =>
  Math.random()
    .toString(36)
    .substring(2, 15) +
  Math.random()
    .toString(36)
    .substring(2, 15);

const password = bcrypt.hashSync(
  'abc123',
  parseInt(process.env.SALT_FACTOR, 10),
);
const versionKey = bcrypt.hashSync(
  randomStr(),
  parseInt(process.env.SALT_FACTOR, 10),
);

const users = [
  {
    firstname: 'Admin',
    lastname: 'Admin',
    email: 'admin@gmail.com',
    password,
    version_key: versionKey,
  },
  {
    firstname: 'Organizer',
    lastname: 'Organizer',
    email: 'organizer@gmail.com',
    password,
    version_key: versionKey,
  },
  {
    firstname: 'Speaker',
    lastname: 'Speaker',
    email: 'speaker@gmail.com',
    password,
    version_key: versionKey,
  },
  {
    firstname: 'Participant',
    lastname: 'Participant',
    email: 'participant@gmail.com',
    password,
    version_key: versionKey,
  },
  {
    firstname: 'Tri',
    lastname: 'Pham Van',
    email: 'pvtri@gmail.com',
    password,
    gender: 'male',
    version_key: versionKey,
  },
  {
    firstname: 'Thuc',
    lastname: 'Tran Van',
    email: 'tvthuc96@gmail.com',
    gender: 'male',
    password,
    version_key: versionKey,
  },
  {
    firstname: 'Vinh',
    lastname: 'Lu Thanh',
    email: 'ltVinh96@gmail.com',
    gender: 'male',
    password,
    version_key: versionKey,
  },
  {
    firstname: 'Manh',
    lastname: 'Le Quoc',
    email: 'lqManh@gmail.com',
    gender: 'male',
    password,
    version_key: versionKey,
  },
  {
    firstname: 'Minh',
    lastname: 'Thai Thi Hong',
    email: 'tthMinh@gmail.com',
    gender: 'female',
    password,
    version_key: versionKey,
  },
];

module.exports = users;
