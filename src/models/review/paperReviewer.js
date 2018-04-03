import { Model } from 'objection';
import Paper from '../paper/paper';
import User from '../authorization/user';
import PaperTopic from '../paper/paperTopic';

export default class PaperReviewer extends Model {
  static tableName = 'papers_reviewers';
  static jsonSchema = {
    type: 'object',
    required: ['paper_id', 'user_id'],
    properties: {
      id: { type: 'integer' },
      conference_id: { type: 'integer' },
      paper_id: { type: 'integer' },
      user_id: { type: 'integer' },
      paper_title: { type: 'string' },
      reviewer_name: { type: 'string' },
      paper_status: { type: 'string' },
      topic_name: { type: 'string' },
    },
  };

  async $beforeValidate() {
    this.paper_id = parseInt(this.paper_id, 10);
  }

  async $beforeInsert() {
    // paper
    const paper = await Paper.query().findById(this.paper_id);
    if (paper) {
      this.paper_title = paper.title;
      this.paper_status = paper.status;
    }

    // user
    const user = await User.query().findById(this.user_id);
    if (user) {
      this.reviewer_name = `${user.firstname} ${user.lastname}`;
      this.conference_id = user.current_conference_id;
    }

    // paper topic
    const paperTopic = await PaperTopic.query().where(
      'paper_id',
      this.paper_id,
    );
    if (paperTopic.length > 0) {
      this.topic_name = paperTopic[0].topic_name;
    }
  }
  async $beforeUpdate() {
    // paper
    const paper = await Paper.query().findById(this.paper_id);
    if (paper) {
      this.paper_title = paper.title;
      this.paper_status = paper.status;
    }

    // user
    const user = await User.query().findById(this.user_id);
    if (user) {
      this.reviewer_name = `${user.firstname} ${user.lastname}`;
      this.conference_id = user.current_conference_id;
    }

    // paper topic
    const paperTopic = await PaperTopic.query().where(
      'paper_id',
      this.paper_id,
    );
    if (paperTopic.length > 0) {
      this.topic_name = paperTopic[0].topic_name;
    }
  }
}
