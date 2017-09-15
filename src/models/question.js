import { Model } from 'objection';
import Answer from './answer';

export default class Question extends Model {
  static tableName = 'questions';
  static jsonSchema = {
    type: 'object',
    required: ['user_id', 'activity_id', 'content'],
    properties: {
      id: { type: 'integer' },
      user_id: { type: 'integer' },
      activity_id: { type: 'integer' },
      content: { type: 'string' },
      created_at: { type: ['string', 'null'] },
    },
  };

  async $beforeValidate(opt) {
    this.id = parseInt(opt.old.id, 10);
    this.activity_id = parseInt(opt.old.activity_id, 10);
    this.user_id = parseInt(opt.old.user_id, 10);
  }

  // delete all answer of question with id
  async deleteAnswer() {
    const answer = await Answer.query().where('question_id', this.id);

    if (answer)
      await Answer.query()
        .delete()
        .where('question_id', this.id);
    return answer;
  }
}
