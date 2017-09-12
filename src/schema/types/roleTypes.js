export default `
  type Role {
    # The ID of role
    id: ID!

    # role name
    name: String!

    # DefaultPermission
    defaultPermissions: [DefaultPermission!]!
  }

  extend type Query {
    # Get information about all roles
    getAllRoles: [Role!]!

    # Get role by ID
    getRoleByID(id: ID!): Role!
  }

 extend type Mutation {
    # Insert new role
    insertRole(name: String!): Role!

    # Update role info by id
    updateRole(id:ID!, name: String!): Role!

    # Delete role by id
    deleteRole(id: ID!): Role!
  }
`;
