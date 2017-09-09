import { Model } from 'objection';

export default class Addresses extends Model {
  static tableName = 'addresses';
  static jsonSchema = {
    type: 'object',
    description: 'A conference address',
    properties: {
      id: { type: 'integer' },
      street: { type: 'string', maxLength: '100' },
      city: { type: 'string', maxLength: '100' },
      country: { type: 'string', maxLength: '100' },
    },
  };

  async $beforeValidate(opt) {
    this.id = parseInt(opt.old.id, 10);
  }
}
