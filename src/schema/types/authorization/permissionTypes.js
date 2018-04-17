export default `
type Permission {
  # ID of permission
  id: ID!

  # role of permission
  role: Role!

  # role name
  role_name: String!

  # user of permission
  user: User!

  # conference
  conference: Conference!

  # full name
  full_name: String!

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
  # Get all permission by user_id and role_id
  getPermissionByRoleIDUserID(role_id: ID!, user_id: ID!): [Permission!]!

  # Get all Permissions
  getAllPermissions: [Permission!]!

  # Get permission by id
  getPermissionByID(id: ID!): Permission!

  # used

  # Get all permission by role_id
  getAllUsersByRoleID(role_id: ID!): [Permission!]!

  # Get all role of user by id
  getAllRolesByUserID(user_id: ID!): [Permission!]!

  # Get all role of login in admin page
  getAllRolesOfUser: [Permission!]!

  # Get all permission by user_id
  getAllPermissionsByUserID(user_id: ID!, conference_id: ID!): [Permission!]!

  # Get all roles active with user id
  getAllRolesActiveByUserID(user_id: ID!, conference_id: ID!): [Permission!]!

}
type Result {
  status: Int!
}

extend type Mutation {

  # Insert users role in conference
  insertRoleForUser(user_id: ID!, role_id: ID!): Result!

  # Update status permission
  updateStatusOfPermission(id: ID!, status: Status!) : Permission!

  # Update status role of User
  updateUserRoleStatus(role_id: ID!, user_id: ID!,conference_id: ID!, status: Status!) : [Permission!]!

  # Delete Permission with permission id
  deletePermission(id: ID!) : [Permission!]!
}
`;
