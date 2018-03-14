export default `
  type PaperReviewQuestionPoint {
    id: ID!

    conference_id: ID!

    review_question_id: ID!

    user: User!

    paper: Paper!

    point: Float!

    comment: String!

    content: String!
  }

  extend type Query {
    getPaperReviewByUserIdPaperId(user_id: ID!, paper_id: ID!): [PaperReviewQuestionPoint!]!
  }

  extend type Mutation {
    insertPaperReview(user_id: ID!, paper_id: ID!, review_question_id: ID!, point: Float!, comment: String): PaperReviewQuestionPoint!
  }
`;
