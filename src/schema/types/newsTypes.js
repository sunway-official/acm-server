export default `
type News {
  # The ID of News
  id: ID!

  # user id
  user: User!

  # conference id
  conference: Conference!

  # News content
  content: String!

  # Document created_at timestamp
  created_at: Date!

  # Document updated_at timestamp
  updated_at: Date!

  # news photos
  newsPhotos: [NewsPhoto!]!

  # news likes
  newsLikes: [NewsLike!]!

  # news comments
  newsComments: [NewsComment!]!

}

extend type Query {
  # Get information about all News
  getAllNews: [News!]!

  # Get News by ID
  getNewsByID(id: ID!): News!

  # Get News by user ID
  getNewsByUserID(user_id: ID!):[ News!]!

  # Get News by conference ID
  getNewsByConferenceID(conference_id: ID!): [News!]!
}

extend type Mutation {
  # Insert new News
  insertNews(
    user_id: ID!,
    conference_id:ID!,
    content: String!
  ): News!

  # Update News info by id
  updateNews(
    id: ID!,
    user_id: ID,
    conference_id:ID,
    content: String
  ): News!

  # Delete News by id
  deleteNews(id: ID!): News!
}
`;
