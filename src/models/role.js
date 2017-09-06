import { Model } from 'objection';

export default class Role extends Model {
  static tableName = 'roles';
  static jsonSchema = {
    type: 'object',
    description: 'A role',
    properties: {
      id: { type: 'integer' },
      name: { type: 'string', maxLength: '100' },
    },
  };

  async $beforeValidate(opt) {
    this.id = parseInt(opt.old.id, 10);
  }
}
