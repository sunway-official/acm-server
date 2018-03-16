export default `
  type PaperReviewer {
    id: ID!

    conference_id: ID!

    user: User!

    paper: Paper!

    paper_title: String!

    paper_status: String!

    topic_name: String!

    reviewer_name: String!

  }

  extend type Query {
    getAllPapersWithReviewer: [PaperReviewer!]!


  }

  extend type Mutation {
    insertPaperReviewer(user_id: ID!, paper_id: ID!): PaperReviewer!
  }
`;
