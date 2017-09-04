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
    firstname: 'Khanh',
    lastname: 'Le Dinh Nhat',
    email: 'lednhatkhanh@gmail.com',
    password,
    version_key: versionKey,
  },
  {
    firstname: 'Tri',
    lastname: 'Pham Van',
    email: 'pvtri@gmail.com',
    password,
    version_key: versionKey,
  },
  {
    firstname: 'Tester',
    lastname: 'Tester',
    email: 'tester@gmail.com',
    password,
    version_key: versionKey,
  },
  {
    firstname: 'Admin',
    lastname: 'Admin',
    email: 'admin@gmail.com',
    password,
    version_key: versionKey,
  },
];

module.exports = users;
