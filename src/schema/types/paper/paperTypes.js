export default `
type Paper {
  # The ID of Paper
  id: ID!

  # conference
  conference: Conference!

  # paper topic
  papersTopic: [PaperTopic!]!


  status: String!

  # title
  title: String!

  # abstract
  abstract: String!

  # file
  file: String!

  # keywords
  keywords: String!

  # reviewers
  reviewers: [PaperReviewer]!

  # authors
  authors: [PaperAuthor]!

  # comments
  comments: [PaperReviewQuestionPoint]!

  # Document created_at timestamp
  created_at: Date!

  # Document updated_at timestamp
  updated_at: Date!

  # topic name
  topic_name: String!

  is_reviewed: Int!
}

type UpdateStatus {
  status: Int!
}

extend type Query {
  # Get Paper by ID
  getPaperByID( id: ID!): Paper!

  # Get Paper by conference ID and role_id
  getPapersByConferenceID(role_id: ID , conference_id: ID): [Paper]!

  # Get Paper by status
  getPapersByStatusId(paper_status_id: ID!): [Paper!]!

  # Get current paper base on current user information
  getCurrentPaper: [Paper!]!
}

extend type Mutation {
  # Insert new Paper
  insertPaper(paper_status_id: ID!, title: String!, abstract: String! , keywords: String, file: String): Paper!

  # Update Paper info by id
  updatePaper( id:ID!, paper_status_id: ID, title: String, abstract: String, keywords: String, file: String ): Paper!

  # update all paper status follow by deadline
  updateAllStatusPapers(current_date: Date!): UpdateStatus!

  # Delete Paper by id
  deletePaper( id: ID! ): Paper
}
`;
