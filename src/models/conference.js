import { Model } from 'objection';

export default class Conference extends Model {
  static tableName = 'conferences';
  static jsonSchema = {
    type: 'object',
    description: 'A conference',
    properties: {
      id: { type: 'integer' },
      title: { type: 'string', maxLength: '100' },
      description: { type: 'string', maxLength: '500' },
      bg_image: { type: 'string', maxLength: '300' },
      organizer_id: { type: 'integer' },
      address_id: { type: 'integer' },
    },
  };

  async $beforeValidate(opt) {
    this.id = parseInt(opt.old.id, 10);
    this.organizer_id = parseInt(opt.old.organizer_id, 10);
    this.address_id = parseInt(opt.old.address_id, 10);
  }
  async $beforeInsert() {
    this.start_date = new Date().toISOString();
    this.end_date = new Date().toISOString();
  }
}
