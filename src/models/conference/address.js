import { Model } from 'objection';
import Conference from './conference';

export default class Address extends Model {
  static tableName = 'addresses';
  static jsonSchema = {
    type: 'object',
    required: ['street', 'city', 'country'],
    description: 'A conference address',
    properties: {
      id: { type: 'integer' },
      street: { type: 'string', maxLength: '100' },
      city: { type: 'string', maxLength: '100' },
      country: { type: 'string', maxLength: '100' },
      lat: { type: 'string', maxLength: '100' },
      long: { type: 'string', maxLength: '100' },
    },
  };

  async $beforeValidate(opt) {
    this.id = parseInt(opt.old.id, 10);
  }

  // delete all conference of address with id
  async deleteConference() {
    const conferences = Conference.query().where('address_id', this.id);
    if (conferences) {
      conferences.map(conference => conference.deleteAllRelationship());
      await Conference.query()
        .delete()
        .where('address_id', this.id);
    }
    return conferences;
  }
}
