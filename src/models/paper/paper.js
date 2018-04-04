import { Model } from 'objection';
import PaperAuthor from './paperAuthor';
import PaperTopic from '../paper/paperTopic';
import PaperStatus from '../paper/paperStatus';
import PaperReviewer from '../review/paperReviewer';

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
  static relationMappings = {
    rls_authors: {
      relation: Model.HasManyRelation,
      modelClass: PaperAuthor,
      join: {
        from: 'papers.id',
        to: 'papers_authors.paper_id',
      },
    },
    rls_reviewers: {
      relation: Model.HasManyRelation,
      modelClass: PaperReviewer,
      join: {
        from: 'papers.id',
        to: 'papers_reviewers.paper_id',
      },
    },
  };

  async $beforeValidate() {
    if (this.paper_status_id) {
      this.paper_status_id = parseInt(this.paper_status_id, 10);
    }
  }

  async $beforeInsert() {
    this.created_at = new Date();
    this.updated_at = new Date();
    if (this.paper_status_id) {
      const paperStatus = await PaperStatus.query().findById(
        this.paper_status_id,
      );
      this.status = paperStatus.name;
    }
  }

  async $beforeUpdate() {
    this.updated_at = new Date();
    if (this.paper_status_id) {
      const paperStatus = await PaperStatus.query().findById(
        this.paper_status_id,
      );
      this.status = paperStatus.name;
    }
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
