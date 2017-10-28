import { Model } from 'objection';

export default class LandingPage extends Model {
  static tableName = 'landing_pages';
  static jsonSchema = {
    type: 'object',
    required: [
      'slogan',
      'register_description',
      'call_paper_description',
      'speaker_description',
      'email',
      'phone_number',
      'facebook_id',
      'conference_id',
    ],
    properties: {
      id: { type: 'integer' },
      conference_id: { type: 'integer' },
      slogan: { type: 'string', maxLength: '300' },
      register_description: { type: 'text' },
      call_paper_description: { type: 'text' },
      speaker_description: { type: 'text' },
      email: { type: 'string', maxLength: '100' },
      phone_number: { type: 'string', maxLength: '12' },
      facebook_id: { type: 'string', maxLength: '100' },
    },
  };

  async $beforeValidate(opt) {
    this.id = parseInt(opt.old.id, 10);
    this.conference_id = parseInt(opt.old.conference_id, 10);
  }
}
