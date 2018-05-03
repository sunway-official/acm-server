export default `
  type UserRating {
    # The ID of role
    id: ID!
    
    rater_id: ID!
    
    user_id: ID!

    rating: Float!

  }

  extend type Query {
    getUserRating(user_id: ID): UserRating
  }

 extend type Mutation {
    rateUser(user_id: ID!, rating: Float!): UserRating
  }
`;
