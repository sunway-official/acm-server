export default `
type Category {
  # The ID of category
  id: ID!

  # The name of category
  name: String!

  conferences: [Conference!]!
}

extend type Query {
  # Get information about all Category
  getAllCategories: [Category!]!

  # Get Category by ID
  getCategoryById(id: ID!): Category!
}
`;
