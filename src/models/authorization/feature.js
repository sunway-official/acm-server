import { Model } from 'objection';
import DefaultPermission from './defaultPermission';
import Permission from './permission';

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

  async deleteDefaultPermission() {
    const defaultPermissions = await DefaultPermission.query().where(
      'feature_id',
      this.id,
    );

    if (defaultPermissions) {
      // delete defaultpermission with feature id
      await DefaultPermission.query()
        .delete()
        .where('feature_id', this.id);
    }

    return defaultPermissions;
  }
  async deletePermission() {
    const permissions = await Permission.query().where('feature_id', this.id);

    if (permissions) {
      // delete permission with feature id
      await Permission.query()
        .delete()
        .where('feature_id', this.id);
    }

    return permissions;
  }

  async deleteAllRelationship() {
    this.deleteDefaultPermission();
    this.deletePermission();
  }
}
