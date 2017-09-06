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
}
