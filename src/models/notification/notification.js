import { Model } from 'objection';

export default class Notification extends Model {
  static tableName = 'notifications';
  static jsonSchema = {
    type: 'object',
    properties: {
      id: { type: 'number' },
      title: { type: 'string', maxLength: '100' },
      content: { type: 'text' },
      read: {
        type: 'boolean',
      },
      sender_id: { type: 'number' },
      receiver_id: {
        type: 'number',
      },
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
