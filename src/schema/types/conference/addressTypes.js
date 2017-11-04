export default `
type Address {
  # The ID of Address
  id: ID!

  # conference
  conferences: [Conference!]!

  # street Address
  street: String!

  # city Address
  city: String!

  # country Address
  country: String!

  lat: Float!
  long: Float!
}

extend type Query {
  # Get information about all Address
  getAllAddresses: [Address!]!

  # Get Address by ID
  getAddressByID(id: ID!): Address!
}

extend type Mutation {
  # Insert new Address
  insertAddress( street: String!, city: String!, country: String!, lat: Float!, long: Float!): Address!

  # Update Address info by id
  updateAddress(id:ID!, street: String, city: String, country: String, lat: Float, long: Float ): Address!

  # Delete Address by id
  deleteAddress(id: ID!): Address!
}
`;
