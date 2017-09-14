import { Model } from 'objection';

export default class Topic extends Model {
  static tableName = 'topics';
  static jsonSchema = {
    type: 'object',
    properties: {
      id: { type: 'integer' },
      name: { type: 'string', maxLength: '100' },
      description: { type: 'string', maxLength: '300' },
    },
  };

  async $beforeValidate(opt) {
    this.id = parseInt(opt.old.id, 10);
  }
}
