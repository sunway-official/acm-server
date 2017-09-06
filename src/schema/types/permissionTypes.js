export default `
type Permission {
  id: ID!
#  role: Role!
#  user: User!
#  feature: Feature!
  status: Int!
}

type Query {
  # Get all Permissions
  getAllPermissions: [Permission!]!
  # Get permission by id
  getPermissionById(id: ID!): Permission!
}

type Mutation {
  insertPermission(role_id: ID!, role_name: String!, user_id: ID!, user_name: String!, feature_id: ID!, status: Int!) : Permission!
  updatePermission(id: ID!, role_id: ID, role_name: String, user_id: ID, user_name: String, feature_id: ID, status: Int) : Permission!
  deletePermission(id: ID!) : Permission!
}
`;
