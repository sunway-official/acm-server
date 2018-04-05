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
      hide: {
        type: 'boolean',
      },
      sender_id: { type: 'number' },
      receiver_id: {
        type: 'number',
      },
      created_at: { type: ['string', 'null'] },
      updated_at: { type: ['string', 'null'] },
    },
  };
  $beforeInsert() {
    this.read = false;
    this.created_at = new Date();
    this.updated_at = new Date();
  }
  $beforeUpdate() {
    this.updated_at = new Date();
  }
}
