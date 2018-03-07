import { Model } from 'objection';
import User from '../authorization/user';
import Paper from './paper';

export default class PaperAuthor extends Model {
  static tableName = 'papers_authors';
  static jsonSchema = {
    type: 'object',
    required: ['paper_id', 'author_id'],
    properties: {
      id: { type: 'integer' },
      paper_id: { type: 'integer' },
      user_id: { type: 'integer' },
      corresponding: { type: 'integer' },
      author_name: { type: 'string', maxLength: '100' },
      author_email: { type: 'string', maxLength: '100' },
      author_title: { type: 'string', maxLength: '100' },
      author_organizer: { type: 'string', maxLength: '200' },
      author_country: { type: 'string', maxLength: '100' },
      paper_status: { type: 'string', maxLength: '20' },
    },
  };

  async $beforeValidate(opt) {
    this.id = parseInt(opt.old.id, 10);
    this.paper_id = parseInt(opt.old.paper_id, 10);
    this.user_id = parseInt(opt.old.user_id, 10);
  }

  async $beforeInsert() {
    const author = await User.query().findById(this.user_id);
    const paper = await Paper.query().findById(this.paper_id);
    this.author_name = author.name;
    this.author_email = author.email;
    this.author_title = author.title;
    this.paper_status = paper.status;
  }
  async $beforeUpdate() {
    const author = await User.query().findById(this.user_id);
    const paper = await Paper.query().findById(this.paper_id);
    this.author_name = author.name;
    this.author_email = author.email;
    this.author_title = author.title;
    this.paper_status = paper.status;
  }
}
