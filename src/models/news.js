import { Model } from 'objection';

export default class Role extends Model {
  static tableName = 'news';
  static jsonSchema = {
    type: 'object',
    description: 'A news',
    properties: {
      id: { type: 'integer' },
      user_id: { type: 'integer' },
      conference_id: { type: 'integer' },
      content: { type: 'string', maxLength: '200' },
    },
  };

  async $beforeValidate(opt) {
    this.id = parseInt(opt.old.id, 10);
    this.user_id = parseInt(opt.old.user_id, 10);
    this.conference_id = parseInt(opt.old.conference_id, 10);
  }

  async $beforeInsert() {
    this.created_at = new Date().toISOString();
    this.updated_at = new Date().toISOString();
  }
  async $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }
}
