const faker = require('faker');
const usersData = require('../authorization/userData');

const user_relationships_in_conferences = [];

for (let i = 1; i <= 128; i += 1) {
  const follower = faker.random.arrayElement(usersData);
  const following = faker.random.arrayElement(usersData);

  user_relationships_in_conferences.push({
    follower_id: follower.id,
    following_id: following.id,
    conference_id: 1,
    follower_followers_count: 1,
    follower_firstname: follower.firstname,
    follower_lastname: follower.lastname,
    follower_avatar: follower.avatar,
    following_followers_count: 1,
    following_firstname: following.firstname,
    following_lastname: following.lastname,
    following_avatar: following.avatar,
  });
}

usersData.forEach(user => {
  let followers_count = 0;
  let followings_count = 0;
  user_relationships_in_conferences.forEach(relation => {
    if (relation.follower_id === user.id) {
      followers_count++; // eslint-disable-line
    }
    if (relation.following_id === user.id) {
      followings_count++; // eslint-disable-line
    }
  });
  user.followers_count = followers_count; // eslint-disable-line
  user.followings_count = followings_count; // eslint-disable-line
});

user_relationships_in_conferences.forEach(relation => {
  usersData.forEach(user => {
    if (relation.follower_id === user.id) {
      relation.follower_followers_count = user.followers_count; // eslint-disable-line
    }
    if (relation.following_id === user.id) {
      relation.following_followers_count = user.followings_count; // eslint-disable-line
    }
  });
});

module.exports = user_relationships_in_conferences;
