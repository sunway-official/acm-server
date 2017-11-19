export default `
type Paper {
  # The ID of Paper
  id: ID!

  # User ID
  user: User!

  # title
  title: String!

  # description
  description: String!

  # Document created_at timestamp
  created_at: Date!

  # Document updated_at timestamp
  updated_at: Date!

}

extend type Query {
  # Get information about all Papers
  getAllPapers: [Paper!]!

  # Get Paper by ID
  getPaperByID( id: ID!): Paper!

  # Get Paper by user ID
  getPaperByUserID( user_id: ID! ): [Paper!]!
}

extend type Mutation {
  # Insert new Paper
  insertPaper( user_id:ID!, title: String!, description: String! ): Paper!

  # Update Paper info by id
  updatePaper( id:ID!, title: String, description: String ): Paper!

  # Delete Paper by id
  deletePaper( id: ID! ): Paper!
}
`;
