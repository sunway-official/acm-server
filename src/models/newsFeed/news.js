import { Model } from 'objection';
import NewsComment from './newsComment';
import NewsLike from './newsLike';
import NewsPhoto from './newsPhoto';

export default class Role extends Model {
  static tableName = 'news';
  static jsonSchema = {
    type: 'object',
    required: ['user_id', 'conference_id', 'content'],
    description: 'A news',
    properties: {
      id: { type: 'integer' },
      user_id: { type: 'integer' },
      conference_id: { type: 'integer' },
      content: { type: 'string', maxLength: '200' },
    },
  };

  async $beforeValidate(opt) {
    this.id = parseInt(opt.old.id, 10);
    this.user_id = parseInt(opt.old.user_id, 10);
    this.conference_id = parseInt(opt.old.conference_id, 10);
  }

  async $beforeInsert() {
    this.created_at = new Date().toISOString();
    this.updated_at = new Date().toISOString();
  }
  async $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }

  // delete all NewsComment of news with id
  async deleteNewsComment() {
    const newsComment = await NewsComment.query().where('news_id', this.id);

    if (newsComment)
      await NewsComment.query()
        .delete()
        .where('news_id', this.id);
    return newsComment;
  }

  // delete all NewsLike of news with id
  async deleteNewsLike() {
    const newsLike = await NewsLike.query().where('news_id', this.id);

    if (newsLike)
      await NewsLike.query()
        .delete()
        .where('news_id', this.id);
    return newsLike;
  }

  // delete all NewsPhoto of news with id
  async deleteNewsPhoto() {
    const newsPhoto = await NewsPhoto.query().where('news_id', this.id);

    if (newsPhoto)
      await NewsPhoto.query()
        .delete()
        .where('news_id', this.id);
    return newsPhoto;
  }

  async deleteAllRelationship() {
    this.deleteNewsComment();
    this.deleteNewsLike();
    this.deleteNewsPhoto();
  }
}
