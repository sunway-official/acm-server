import { Model } from 'objection';
import Author from './author';

export default class PaperAuthor extends Model {
  static tableName = 'papers_authors';
  static jsonSchema = {
    type: 'object',
    required: ['paper_id', 'author_id'],
    properties: {
      id: { type: 'integer' },
      paper_id: { type: 'integer' },
      author_id: { type: 'integer' },
      corresponding: { type: 'integer' },
      author_name: { type: 'text', maxLength: '100' },
      author_email: { type: 'text', maxLength: '100' },
      author_title: { type: 'text', maxLength: '100' },
    },
  };

  async $beforeValidate(opt) {
    this.id = parseInt(opt.old.id, 10);
    this.paper_id = parseInt(opt.old.paper_id, 10);
    this.author_id = parseInt(opt.old.author_id, 10);
  }

  async $beforeInsert() {
    const author = await Author.query().where('id', this.author_id);
    this.author_name = author[0].name;
    this.author_email = author[0].email;
    this.author_title = author[0].title;
  }
  async $beforeUpdate() {
    const author = await Author.query().where('id', this.author_id);
    this.author_name = author[0].name;
    this.author_email = author[0].email;
    this.author_title = author[0].title;
  }
}
