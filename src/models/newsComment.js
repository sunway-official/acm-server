import { Model } from 'objection';

export default class NewsComment extends Model {
  static tableName = 'news_comments';
  static jsonSchema = {
    type: 'object',
    description: 'A news comment',
    properties: {
      id: { type: 'integer' },
      news_id: { type: 'integer' },
      user_id: { type: 'integer' },
      content: { type: 'string', maxLength: '200' },
    },
  };

  async $beforeValidate(opt) {
    this.id = parseInt(opt.old.id, 10);
    this.news_id = parseInt(opt.old.news_id, 10);
    this.user_id = parseInt(opt.old.user_id, 10);
  }
}
