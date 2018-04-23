export default `
type Follower {
  # The ID of relationship
  id: ID!

  follower_id: ID!

  user: User!

  following_id: ID!

  following: User!

  conference_id: ID!

  # Conference
  conference: Conference!

  firstname: String!

  lastname: String!

  avatar: String

  followers_count: Int!

  is_following: Boolean!

}

extend type Query {
  getFollowers: [Follower!]!
}

extend type Mutation {
  followUser(user_id: ID!): Following!

  unfollowUser(user_id: ID!): RequestResult!
}
`;
