export default `
type Feature {
  # The ID of feature
  id: String!

  # The description of feature
  description: String!

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
  insertFeature(id: String!): Feature!

  # Update Feature info by id
  updateFeature(id:String!, description: String!): Feature!

  # Delete feature by id
  deleteFeature(id: ID!): Feature!
}
`;
