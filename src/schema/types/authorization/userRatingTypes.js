export default `
  type UserRating {
    # The ID of role
    id: ID!

    rating: Float!

  }

  extend type Query {
    getUserRating: UserRating
  }

 extend type Mutation {
    rateUser(user_id: ID!, rating: Int!): UserRating
  }
`;
