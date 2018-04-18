import { Model } from 'objection';
import User from '../authorization/user';

export default class ConferenceUserRelationship extends Model {
  static tableName = 'user_relationships_in_conferences';
  static jsonSchema = {
    type: 'object',
    required: ['follower_id', 'following_id', 'conference_id'],
    description: 'A conference address',
    properties: {
      id: { type: 'integer' },
      follower_id: { type: 'integer' },
      following_id: { type: 'integer' },
      conference_id: { type: 'integer' },
      follower_followers_count: { type: 'integer' },
      follower_firstname: { type: 'string', maxLength: '100' },
      follower_lastname: { type: 'string', maxLength: '100' },
      follower_avatar: { type: 'string', maxLength: '100' },
      following_followers_count: { type: 'integer' },
      following_firstname: { type: 'string', maxLength: '100' },
      following_lastname: { type: 'string', maxLength: '100' },
      following_avatar: { type: 'string', maxLength: '100' },
    },
  };

  async $beforeValidate(opt) {
    this.id = parseInt(opt.old.id, 10);
  }

  async $beforeInsert() {
    const follower = await User.query().where('id', this.follower_id);
    const following = await User.query().where('id', this.following_id);
    this.follower_followers_count = follower.followers_count;
    this.follower_firstname = follower.firstname;
    this.follower_lastname = follower.lastname;
    this.follower_avatar = follower.avatar;
    this.following_followers_count = following.followings_count;
    this.following_firstname = following.firstname;
    this.following_lastname = following.lastname;
    this.following_avatar = following.avatar;
  }

  async $afterInsert() {
    const [followers_count, followings_count] = await Promise.all([
      ConferenceUserRelationship.getFollowersCount(this.follower_id),
      ConferenceUserRelationship.getFollowingCount(this.following_id),
    ]);

    await User.query().update({
      followers_count,
      followings_count,
    });
  }

  static async getFollowersCount(follower_id) {
    const followings = await ConferenceUserRelationship.query()
      .where('follower_id', follower_id)
      .groupBy('following_id')
      .count('id')
      .first();
    return followings.count;
  }

  static async getFollowingCount(following_id) {
    const followers = await ConferenceUserRelationship.query()
      .where('following_id', following_id)
      .groupBy('follower_id')
      .count('id')
      .first();

    return followers.count;
  }
}
