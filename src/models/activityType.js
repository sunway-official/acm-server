import { Model } from 'objection';
import Activity from './activity';

export default class ActivityType extends Model {
  static tableName = 'activity_types';
  static jsonSchema = {
    type: 'object',
    description: 'all types of activity',
    required: ['name'],
    properties: {
      id: { type: 'integer' },
      name: { type: 'string', maxLength: '100' },
    },
  };

  async $beforeValidate(opt) {
    this.id = parseInt(opt.old.id, 10);
  }

  async deleteActivity() {
    const activities = Activity.query().where('activity_type_id', this.id);

    if (activities) {
      activities.map(activity => activity.deleteAllRelationship());

      await Activity.query()
        .delete()
        .where('activity_type_id', this.id);
    }
  }
}
