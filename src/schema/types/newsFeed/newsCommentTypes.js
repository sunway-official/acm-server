export default `
type NewsComment {
  # The ID of NewsComment
  id: ID!

  # News ID
  news: News!

  # User ID
  user: User!

  # NewsComment content
  content:String!

  # Document created_at timestamp
  created_at: Date!

  # Document updated_at timestamp
  updated_at: Date!


}

extend type Query {
  # Get information about all NewsComment
  getAllNewsComments: [NewsComment!]!

  # Get NewsComment by ID
  getNewsCommentByID(id: ID!): NewsComment!

  # Get NewsComment by news ID
  getNewsCommentByNewsID(news_id: ID!): [NewsComment!]!

  # Get NewsComment by user ID
  getNewsCommentByUserID(user_id: ID!): [NewsComment!]!
}

extend type Mutation {
  # Insert new NewsComment
  insertNewsComment( news_id: ID!,user_id: ID!, content: String! ): NewsComment!

  # Update NewsComment info by id
  updateNewsComment( id:ID!, content: String! ): NewsComment!

  # Delete NewsComment by id
  deleteNewsComment( id: ID! ): NewsComment!
}
`;
