import { Model } from 'objection';

export default class Role extends Model {
  static tableName = 'news_photos';
  static jsonSchema = {
    type: 'object',
    description: 'A news photo',
    properties: {
      id: { type: 'integer' },
      news_id: { type: 'integer' },
      name: { type: 'string', maxLength: '100' },
      url: { type: 'string', maxLength: '256' },
    },
  };

  async $beforeValidate(opt) {
    this.id = parseInt(opt.old.id, 10);
    this.news_id = parseInt(opt.old.news_id, 10);
  }
}
