export default `type User {
  # The ID of user
  id: ID!
  # User firstname
  firstname: String!
  # User lastname
  lastname: String!
  # User email address
  email: String!
  # User birthdate
  dob: Date
  # User gender
  gender: Gender!
  # Document created_at timestamp
  created_at: Date!
  # Document updated_at timestamp
  updated_at: Date!
}

enum Gender {
  male
  female
  unknown
}

type Query {
  # Get information about all users
  getAllUsers: [User!]!
  # Get information about current logged in user, need Authorization and RefreshToken headers
  me: User!
}

type Mutation {
  # Register new user, need to remove Authorization and RefreshToken headers
  register(
    # User firstname
    firstname: String!
    # User lastname
    lastname: String!
    # User email address
    email: String!
    # User password
    password: String!
  ): User!
  # Login to system, need to remove Authorization and RefreshToken headers
  login(
    # User email address
    email: String!
    # User password
    password: String!
  ): LoginResponse
}

type LoginResponse {
  token: String!
  refreshToken: String!
}
`;
