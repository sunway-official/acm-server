export default `
type Feature {
  # The ID of feature
  id: ID!

  # feature name
  name: String!

  # DefaultPermission
  defaultPermissions: [DefaultPermission!]!
}

extend type Query {
  # Get information about all features
  getAllFeatures: [Feature!]!

  # Get feature by ID
  getFeatureByID(id: ID!): Feature!
}

extend type Mutation {
  # Insert new feature
  insertFeature(name: String!): Feature!

  # Update Feature info by id
  updateFeature(id:ID!, name: String!): Feature!

  # Delete feature by id
  deleteFeature(id: ID!): Feature!
}
`;
