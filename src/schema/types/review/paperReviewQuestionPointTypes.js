export default `
  type PaperReviewQuestionPoint {
    id: ID!

    conference_id: ID!

    review_question_id: ID!

    user: User!

    paper: Paper!

    point: Float!

    paper_title: String!

    paper_status: String!

    topic_name: String!

    reviewer_name: String!

    comment: String!

    content: String!
  }

  extend type Query {
    getPaperReviewByUserIdPaperId(user_id: ID!, paper_id: ID!): [PaperReviewQuestionPoint!]!


  }

  extend type Mutation {
    insertPaperReviewQuestion(user_id: ID!, paper_id: ID!, review_question_id: ID!, point: Float!, comment: String): PaperReviewQuestionPoint!
  }
`;
