import { Model } from 'objection';
import Conference from './conference';

export default class OrganizerDetail extends Model {
  static tableName = 'organizer_detail';
  static jsonSchema = {
    type: 'object',
    description: 'The detail of an organizer',
    properties: {
      id: { type: 'integer' },
      user_id: { type: 'integer' },
      name: { type: 'string', maxLength: '100' },
      email: {
        type: 'string',
        format: 'email',
        minLength: '5',
        maxLength: '100',
      },
      address: { type: 'string', maxLength: '200' },
      website: { type: 'string', maxLength: '100' },
      phone: { type: 'string', maxLength: '20' },
    },
  };

  async $beforeValidate(opt) {
    this.id = parseInt(opt.old.id, 10);
    this.user_id = parseInt(opt.old.user_id, 10);
  }
  async deleteConference() {
    const organizerDetail = Conference.query().where(
      'organizer_detail_id',
      this.id,
    );
    if (organizerDetail) {
      await Conference.query()
        .delete()
        .where('organizer_detail_id', this.id);
    }
  }
}
