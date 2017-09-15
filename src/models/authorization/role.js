import { Model } from 'objection';
import DefaultPermission from './defaultPermission';
import Permission from './permission';

export default class Role extends Model {
  static tableName = 'roles';
  static jsonSchema = {
    type: 'object',
    description: 'A role',
    required: ['name'],
    properties: {
      id: { type: 'integer' },
      name: { type: 'string', maxLength: '100' },
    },
  };

  async $beforeValidate(opt) {
    this.id = parseInt(opt.old.id, 10);
  }

  async deleteDefaultPermission() {
    const defaultPermissions = await DefaultPermission.query().where(
      'role_id',
      this.id,
    );

    if (defaultPermissions) {
      // delete defaultpermission with role id
      await DefaultPermission.query()
        .delete()
        .where('role_id', this.id);
    }

    return defaultPermissions;
  }
  async deletePermission() {
    const permissions = await Permission.query().where('role_id', this.id);

    if (permissions) {
      // delete permission with role id
      await Permission.query()
        .delete()
        .where('role_id', this.id);
    }

    return permissions;
  }

  async deleteAllRelationship() {
    this.deleteDefaultPermission();
    this.deletePermission();
  }
}
