const bcrypt = require('bcryptjs');

const randomStr = () =>
  Math.random()
    .toString(36)
    .substring(2, 15) +
  Math.random()
    .toString(36)
    .substring(2, 15);

const password = bcrypt.hashSync(
  'Abc123@@',
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
    email: 'pvtri96@gmail.com',
    password,
    gender: 'male',
    version_key: versionKey,
    bio:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley ",
    language: 'Vietnamese',
  },
  {
    firstname: 'Thuc',
    lastname: 'Tran Van',
    email: 'tranvanthuc365@gmail.com',
    gender: 'male',
    password,
    version_key: versionKey,
  },
  {
    firstname: 'Vinh',
    lastname: 'Lu Thanh',
    email: 'luthanhvinhdtu@gmail.com',
    gender: 'male',
    password,
    version_key: versionKey,
  },
  {
    firstname: 'Manh',
    lastname: 'Le Quoc',
    email: 'lequocmanh2010@gmail.com',
    gender: 'male',
    password,
    version_key: versionKey,
  },
  {
    firstname: 'Minh',
    lastname: 'Thai Thi Hong',
    email: 'minhthai0124@gmail.com',
    gender: 'female',
    password,
    version_key: versionKey,
  },
  {
    firstname: 'Dung',
    lastname: 'Le Thi Thuy',
    email: 'dungle1811@gmail.com',
    gender: 'male',
    password,
    version_key: versionKey,
  },
  {
    firstname: 'Khanh',
    lastname: 'Ly Bao',
    email: 'baokhanh7m@gmail.com',
    gender: 'male',
    password,
    version_key: versionKey,
  },
  {
    firstname: 'Khanh',
    lastname: 'Le Dinh Nhat',
    email: 'lednhatkhanh@gmail.com',
    gender: 'male',
    password,
    version_key: versionKey,
  },
  {
    firstname: 'Man',
    lastname: 'Nguyen Duc',
    email: 'mannd@duytan.edu.vn',
    gender: 'male',
    password,
    version_key: versionKey,
    bio:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley ",
    language: 'Vietnamese',
  },
  {
    firstname: 'Supporter',
    lastname: 'Supporter',
    email: 'supporter@gmail.com',
    gender: 'male',
    password,
    version_key: versionKey,
    bio:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley ",
    language: 'Vietnamese',
  },
  {
    firstname: 'Moderator',
    lastname: 'Moderator',
    email: 'moderator@gmail.com',
    gender: 'male',
    password,
    version_key: versionKey,
    bio:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley ",
    language: 'Vietnamese',
  },
  {
    firstname: 'ticket',
    lastname: 'checker',
    email: 'ticket@duytan.edu.vn',
    gender: 'male',
    password,
    version_key: versionKey,
    bio:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley ",
    language: 'Vietnamese',
  },
  {
    firstname: 'author',
    lastname: '',
    email: 'author@gmail.com',
    gender: 'male',
    password,
    version_key: versionKey,
    bio:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley ",
    language: 'Vietnamese',
  },
  {
    firstname: 'reviewer',
    lastname: '',
    email: 'reviewer@gmail.com',
    gender: 'male',
    password,
    version_key: versionKey,
    bio:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley ",
    language: 'Vietnamese',
  },
];

module.exports = users;
