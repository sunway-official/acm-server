export default `
type DefaultPermission {
  # The ID of DefaultPermission
  id: ID!

  # Role ID
  role: Role!

  # Feature ID
  feature: Feature!
}

extend type Query {
  # Get information about all DefaultPermission
  getAllDefaultPermissions: [DefaultPermission!]!

  # Get DefaultPermission by ID
  getDefaultPermissionByID(id: ID!): DefaultPermission!
}

extend type Mutation {
  # Insert new DefaultPermission
  insertDefaultPermission( role_id: ID!, feature_id: ID!): DefaultPermission!

  # Update DefaultPermission info by id
  updateDefaultPermission(id:ID!, role_id: ID, feature_id: ID): DefaultPermission!

  # Delete DefaultPermission by id
  deleteDefaultPermission(id: ID!): DefaultPermission!
}
`;
