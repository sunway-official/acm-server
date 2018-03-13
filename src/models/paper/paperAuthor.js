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
      conference_id: { type: 'integer' },
      corresponding: { type: 'integer' },
      author_name: { type: 'string', maxLength: '100' },
      author_email: { type: 'string', maxLength: '100' },
      author_title: { type: 'string', maxLength: '100' },
      author_organization: { type: 'string', maxLength: '200' },
      author_country: { type: 'string', maxLength: '100' },
      paper_status: { type: 'string', maxLength: '20' },
    },
  };

  async $beforeValidate(opt) {
    this.id = parseInt(opt.old.id, 10);
    this.paper_id = parseInt(opt.old.paper_id, 10);
    this.user_id = parseInt(opt.old.user_id, 10);
    this.conference_id = parseInt(opt.old.conference_id, 10);
  }

  async $beforeInsert() {
    if (this.user_id) {
      const author = await User.query().findById(this.user_id);
      this.author_name = `${author.firstname} ${author.lastname}`;
      this.author_email = author.email;
      this.author_title = author.position;
    }
    const paper = await Paper.query().findById(this.paper_id);
    if (paper) {
      this.paper_status = paper.status;
      this.conference_id = paper.conference_id;
    }
  }
  async $beforeUpdate() {
    if (this.user_id) {
      const author = await User.query().findById(this.user_id);
      this.author_name = `${author.firstname} ${author.lastname}`;
      this.author_email = author.email;
      this.author_title = author.position;
    }
    const paper = await Paper.query().findById(this.paper_id);
    if (paper) {
      this.paper_status = paper.status;
      this.conference_id = paper.conference_id;
    }
  }
}
