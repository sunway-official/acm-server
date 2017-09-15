export default `
type NewsPhoto {
  # The ID of NewsPhoto
  id: ID!

  # News ID
  news: News!

  # NewsPhoto name
  name: String!

  # NewsPhoto url
  url: String!
}

extend type Query {
  # Get information about all NewsPhotos
  getAllNewsPhotos: [NewsPhoto!]!

  # Get NewsPhoto by ID
  getNewsPhotoByID(id: ID!): NewsPhoto!

  # Get NewsPhoto by news ID
  getNewsPhotoByNewsID(news_id: ID!): [NewsPhoto!]!
}

extend type Mutation {
  # Insert new NewsPhoto
  insertNewsPhoto( news_id: ID!, name: String!, url:String! ): NewsPhoto!

  # Update NewsPhoto info by id
  updateNewsPhoto( id:ID!, news_id: ID, name: String, url:String ): NewsPhoto!

  # Delete NewsPhoto by id
  deleteNewsPhoto( id: ID! ): NewsPhoto!
}
`;
