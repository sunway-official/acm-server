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
  # Get all Permissions
  getAllPermissions: [Permission!]!

  # Get permission by id
  getPermissionByID(id: ID!): Permission!

  # Get all permission by role_id
  getAllUsersByRoleID(role_id: ID!): [Permission!]!

  # Get all role of user by id
  getAllRolesByUserID(user_id: ID!): [Permission!]!

  # Get all permission by user_id
  getAllPermissionsByUserID(user_id: ID!): [Permission!]!

  # Get all permission by user_id and role_id
  getPermissionByRoleIDUserID(role_id: ID!, user_id: ID!): [Permission!]!

  # Get all roles active with user id 
  getAllRolesActiveByUserID(user_id: ID!): [Permission!]!

}

extend type Mutation {

  # Update status permission
  updateStatusOfPermission(id: ID!, status: Status!) : Permission!

  # Update status role of User
  updateStatusRoleOfUser(role_id: ID!, user_id: ID!,conference_id: ID!, status: Status!) : [Permission!]!

  # Delete Permission with permission id
  deletePermission(id: ID!) : [Permission!]!
}
`;
