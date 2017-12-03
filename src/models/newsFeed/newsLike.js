import { Model } from 'objection';

export default class Role extends Model {
  static tableName = 'news_likes';
  static jsonSchema = {
    type: 'object',
    required: ['news_id', 'user_id'],
    description: 'A news like',
    properties: {
      id: { type: 'integer' },
      news_id: { type: 'integer' },
      user_id: { type: 'integer' },
    },
  };

  async $beforeValidate(opt) {
    this.id = parseInt(opt.old.id, 10);
    this.news_id = parseInt(opt.old.news_id, 10);
    this.user_id = parseInt(opt.old.user_id, 10);
  }
  async $beforeInsert() {
    this.created_at = new Date();
    this.updated_at = new Date();
  }
  async $beforeUpdate() {
    this.updated_at = new Date();
  }
}
