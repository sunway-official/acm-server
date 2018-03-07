import { Model } from 'objection';
import PaperTopic from '../paper/paperTopic';
import PaperStatus from '../paper/paperStatus';

export default class Paper extends Model {
  static tableName = 'papers';
  static jsonSchema = {
    type: 'object',
    required: ['title', 'conference_id', 'paper_status_id'],
    properties: {
      id: { type: 'integer' },
      conference_id: { type: 'integer' },
      paper_status_id: { type: 'integer' },
      title: { type: 'string' },
      abstract: { type: 'text' },
      keywords: { type: 'string' },
      file: { type: 'text' },
      status: { type: 'string' },
    },
  };

  async $beforeInsert() {
    this.created_at = new Date();
    this.updated_at = new Date();
    const paperStatus = await PaperStatus.query().findById(
      this.paper_status_id,
    );
    this.status = paperStatus.name;
  }

  async $beforeUpdate() {
    this.updated_at = new Date();
    const paperStatus = await PaperStatus.query().findById(
      this.paper_status_id,
    );
    this.status = paperStatus.name;
  }

  async $beforeValidate(opt) {
    this.id = parseInt(opt.old.id, 10);
    this.conference_id = parseInt(opt.old.conference_id, 10);
  }

  // delete all topic of paper with id
  async deletePaperTopic() {
    await PaperTopic.query()
      .delete()
      .where('paper_id', this.id);

    return true;
  }

  async deleteAllRelationship() {
    this.deletePaperTopic();
  }
}
