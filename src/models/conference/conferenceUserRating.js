import { Model } from 'objection';

export default class ConferenceUserRating extends Model {
  static tableName = 'conference_user_ratings';
  static jsonSchema = {
    type: 'object',
    required: ['rater_id', 'user_id', 'conference_id'],
    description: 'A conference address',
    properties: {
      id: { type: 'integer' },
      rater_id: { type: 'integer' },
      user_id: { type: 'integer' },
      conference_id: { type: 'integer' },
      rating: { type: 'float' },
    },
  };

  async $beforeValidate(opt) {
    if (opt.old) {
      this.id = parseInt(opt.old.id, 10);
    }
  }
}
