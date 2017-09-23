import { Model } from 'objection';

export default class Permission extends Model {
  static tableName = 'permissions';
  static jsonSchema = {
    type: 'object',
    required: ['role_id', 'role_name', 'user_id', 'user_name', 'feature_id'],
    properties: {
      id: { type: 'integer' },
      role_id: {
        type: 'integer',
        description: 'Role of user',
      },
      role_name: {
        type: 'string',
        minLength: '1',
        maxLength: '100',
      },
      user_id: {
        type: 'integer',
      },
      full_name: {
        type: 'string',
        minLength: '1',
        maxLength: '100',
      },
      feature_id: {
        type: 'integer',
      },
      status: {
        enum: ['on', 'off'],
        default: 'on',
      },
    },
  };

  async $beforeValidate(opt) {
    this.role_id = parseInt(opt.old.role_id, 10);
    this.user_id = parseInt(opt.old.user_id, 10);
    this.feature_id = parseInt(opt.old.feature_id, 10);
  }
  async $beforeInsert() {
    if (!this.status) this.status = 'on';
  }
  async $beforeUpdate() {
    if (!this.status) this.status = 'on';
  }
}
