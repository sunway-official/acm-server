import { Model } from 'objection';

export default class Paper extends Model {
  static tableName = 'papers';
  static jsonSchema = {
    type: 'object',
    required: ['user_id', 'title'],
    properties: {
      id: { type: 'integer' },
      user_id: { type: 'integer' },
      title: { type: 'string' },
      description: { type: 'text' },
    },
  };

  async $beforeInsert() {
    this.created_at = new Date().toISOString();
    this.updated_at = new Date().toISOString();
  }

  async $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }

  async $beforeValidate(opt) {
    this.id = parseInt(opt.old.id, 10);
    this.user_id = parseInt(opt.old.user_id, 10);
  }
}
