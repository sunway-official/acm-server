import { Model } from 'objection';

export default class Feature extends Model {
  static tableName = 'features';
  static jsonSchema = {
    type: 'object',
    description: 'A feature',
    properties: {
      id: { type: 'integer' },
      name: { type: 'string', maxLength: '100' },
    },
  };

  async $beforeValidate(opt) {
    this.id = parseInt(opt.old.id, 10);
  }
}
