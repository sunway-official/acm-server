export default `
type NewsLike {
  # The ID of NewsLike
  id: ID!

  # News ID
  news: News!

  # User ID
  user: User!

  # Document created_at timestamp
  created_at: Date!

  # Document updated_at timestamp
  updated_at: Date!

}

extend type Query {
  # Get information about all NewsLikes
  getAllNewsLikes: [NewsLike!]!

  # Get NewsLike by ID
  getNewsLikeByID(id: ID!): NewsLike!

}

extend type Mutation {
  # Insert new NewsLike
  insertNewsLike( news_id: ID!,user_id: ID! ): NewsLike!

  # Update NewsLike info by id
  updateNewsLike( id:ID!, news_id: ID, user_id: ID ): NewsLike!

  # Delete NewsLike by id
  deleteNewsLike( id: ID! ): NewsLike!
}
`;
