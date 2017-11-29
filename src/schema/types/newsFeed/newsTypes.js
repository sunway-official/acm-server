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

  # comments count
  commentsCount: Int!

  #likes count
  likesCount: Int!

  isLiked: Boolean!
}

extend type Query {
  # Get information about all News
  getAllNews(
    # Page Number
    pageNumber: Int,
    # Numers of news per page
    pageSize: Int
  ): [News!]!

  # Get News by ID
  getNewsByID(id: ID!): News!

  # Get News by user ID
  getNewsByUserID(user_id: ID!):[ News!]!
}

extend type Mutation {
  # Insert new News
  insertNews(
    content: String!
  ): News!

  # Update News info by id
  updateNews(
    id: ID!,
    content: String
  ): News!

  # Delete News by id
  deleteNews(id: ID!): News!
}
`;
