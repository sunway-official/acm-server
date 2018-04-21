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
  
  followings_count: Int!

}

extend type Query {
  getFollowers: [Follower!]!
}

extend type Mutation {
  
}
`;
