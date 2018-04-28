export default `
  type UserRating {
    # The ID of role
    id: ID!

    rating: Float!

  }

  extend type Query {
    getUserRating(user_id: ID): UserRating
  }

 extend type Mutation {
    rateUser(user_id: ID!, rating: Float!): UserRating
  }
`;
