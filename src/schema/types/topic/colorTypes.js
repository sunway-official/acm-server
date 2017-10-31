export default `
type Color {
  # The ID of Color
  id: ID!


  # name of Color
  name: String!

  #  Color code
  code: String!

  # all topics have this Color
  topics: [Topic!]!

}

extend type Query {
  # Get information about all Color
  getAllColors: [Color!]!

  # Get Color by ID
  getColorByID(id: ID!): Color!

}

extend type Mutation {
  # Insert new Color
  insertColor( name: String!, code: String!): Color!

  # Update Color info by id
  updateColor(id:ID!, name: String, code: String ): Color!

  # Delete Color by id
  deleteColor(id: ID!): Color!
}
`;
