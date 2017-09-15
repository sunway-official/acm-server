export default `
type Permission {
  # ID of permission
  id: ID!

  # role of permission
  role: Role!

  # user of permission
  user: User!

  # feature of user in perssion
  feature: Feature!

  # status 'on' or 'off'
  status: Status!
}

enum Status{
  on
  off
}

extend type Query {
  # Get all Permissions
  getAllPermissions: [Permission!]!

  # Get permission by id
  getPermissionByID(id: ID!): Permission!

  # Get all permission by role_id
  getAllUsersByRoleID(role_id: ID!): [Permission!]!

  # Get all permission by user_id
  getAllFeaturesByUserID(user_id: ID!): [Permission!]!

  # Get all permission by user_id and role_id
  getPermissionByRoleIDUserID(role_id: ID!, user_id: ID!): [Permission!]!

}

extend type Mutation {
  # Insert Permission with role id, user id and status
  insertPermission(role_id: ID!, user_id: ID!) : [Permission!]!

  # Update status permission
  updateStatusPermission(id: ID!, status: Status!) : Permission!

  # Update role of User
  updateRoleOfUserInPermission(role_id: ID!, user_id: ID!) : [Permission!]!

  # Delete Permission with permission id
  deletePermission(id: ID!) : [Permission!]!
}
`;
