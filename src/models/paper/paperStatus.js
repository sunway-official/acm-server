import { Model } from 'objection';

export default class Paper extends Model {
  static tableName = 'papers_status';
  static jsonSchema = {
    type: 'object',
    required: ['name'],
    properties: {
      id: { type: 'integer' },
      name: { type: 'string' },
    },
  };

  async $beforeInsert() {
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  async $beforeUpdate() {
    this.updated_at = new Date();
  }
}
