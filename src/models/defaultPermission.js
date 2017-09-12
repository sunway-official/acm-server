import { Model } from 'objection';

export default class DefaultPermission extends Model {
  static tableName = 'default_permissions';
  static jsonSchema = {
    type: 'object',
    description: 'A default permission',
    properties: {
      id: { type: 'integer' },
      role_id: { type: 'integer' },
      feature_id: { type: 'integer' },
    },
  };

  async $beforeValidate(opt) {
    this.id = parseInt(opt.old.id, 10);
    this.role_id = parseInt(opt.old.role_id, 10);
    this.feature_id = parseInt(opt.old.feature_id, 10);
  }
}
