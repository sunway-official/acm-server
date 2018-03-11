export default `
  type ReviewQuestion {
    id: ID!

    conference: Conference!

    content: String!
  }

  extend type Query {
    # get all questions to review paper
    getAllReviewQuestions: [ReviewQuestion!]!
  }

  extend type Mutation {
    insertReviewQuestion(content: String!) : ReviewQuestion!
  }
`;
