export default `
type Address {
  # The ID of Address
  id: ID!

  # conference
  conference: [Conference!]!

  # street Address
  street: String!

  # city Address
  city: String!

  # country Address
  country: String!

}

extend type Query {
  # Get information about all Address
  getAllAddresses: [Address!]!

  # Get Address by ID
  getAddressByID(id: ID!): Address!
}

extend type Mutation {
  # Insert new Address
  insertAddress( street: String!, city: String!, country: String!): Address!

  # Update Address info by id
  updateAddress(id:ID!, street: String, city: String, country: String ): Address!

  # Delete Address by id
  deleteAddress(id: ID!): Address!
}
`;
