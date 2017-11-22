import { Model } from 'objection';
import PaperAuthor from './paperAuthor';

export default class Author extends Model {
  static tableName = 'authors';
  static jsonSchema = {
    type: 'object',
    required: ['name', 'title', 'email'],
    properties: {
      id: { type: 'integer' },
      name: { type: 'string' },
      email: { type: 'string' },
      title: { type: 'string' },
    },
  };

  async $beforeValidate(opt) {
    this.id = parseInt(opt.old.id, 10);
  }

  // delete all topic of paper with id
  async deletePaperAuthor() {
    const paperAuthor = await PaperAuthor.query().where('paper_id', this.id);

    if (paperAuthor)
      await PaperAuthor.query()
        .delete()
        .where('paper_id', this.id);
    return paperAuthor;
  }

  async deleteAllRelationship() {
    this.deletePaperAuthor();
  }
}
