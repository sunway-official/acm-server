export default `
type Paper {
  # The ID of Paper
  id: ID!

  # conference
  conference: Conference!

  # paper topic
  papersTopic: [PaperTopic!]!

  # paper author
  papersAuthors: [PaperAuthor!]!

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
  reviewers: [String]!

  # authors
  authors: [String]!

  # Document created_at timestamp
  created_at: Date!

  # Document updated_at timestamp
  updated_at: Date!

  # topic name
  topic_name: String!
}

extend type Query {
  # Get Paper by ID
  getPaperByID( id: ID!): Paper!

  # Get Paper by conference ID and role_id
  getPapersByConferenceID(role_id: ID , conference_id: ID): [Paper]!

  # Get Paper by user ID
  getPapersByUserID: [Paper!]!

  # Get Paper by status
  getPapersByStatusId(paper_status_id: ID!): [Paper!]!
}

extend type Mutation {
  # Insert new Paper
  insertPaper(paper_status_id: ID!, title: String!, abstract: String! , keywords: String, file: String): Paper!

  # Update Paper info by id
  updatePaper( id:ID!, paper_status_id: ID, title: String, abstract: String, keywords: String, file: String ): Paper!

  # Delete Paper by id
  deletePaper( id: ID! ): Paper
}
`;
