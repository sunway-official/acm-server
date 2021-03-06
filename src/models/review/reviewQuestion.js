import { Model } from 'objection';

export default class ReviewQuestion extends Model {
  static tableName = 'review_questions';
  static jsonSchema = {
    type: 'object',
    required: ['content'],
    properties: {
      id: { type: 'integer' },
      conference_id: { type: 'integer' },
      content: { type: 'text' },
    },
  };
}
