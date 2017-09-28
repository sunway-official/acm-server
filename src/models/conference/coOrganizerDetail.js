import { Model } from 'objection';

export default class Conference extends Model {
  static tableName = 'coOrganizer_detail';
  static jsonSchema = {
    type: 'object',
    required: ['conference_id', 'name', 'email'],
    description: 'A coOrganizer_detail',
    properties: {
      id: { type: 'integer' },
      conference_id: { type: 'integer' },
      name: { type: 'string', maxLength: '100' },
      address: { type: 'string', maxLength: '100' },
      email: { type: 'string', maxLength: '100' },
      website: { type: 'string', maxLength: '100' },
      phone: { type: 'string', maxLength: '20' },
    },
  };

  async $beforeValidate(opt) {
    this.id = parseInt(opt.old.id, 10);
    this.conference_id = parseInt(opt.old.conference_id, 10);
  }
}
