export default `
type CoOrganizerDetail {
  # The ID of CoOrganizerDetail
  id: ID!

  # Conference id
  conference: Conference!

  # Conference name
  name: String!

  # CoOrganizerDetail Address
  address: String!

  # CoOrganizerDetail email
  email: String!

  # CoOrganizerDetail website
  website: String!

  # CoOrganizerDetail phone
  phone: String!
}

extend type Query {
  # Get information about all CoOrganizerDetail
  getAllCoOrganizerDetails: [CoOrganizerDetail!]!

  # Get CoOrganizerDetail by ID
  getCoOrganizerDetailByID(id: ID!): CoOrganizerDetail!

  # Get CoOrganizerDetail by conference ID
  getCoOrganizerDetailByConferenceID( conference_id: ID!): CoOrganizerDetail!

}

extend type Mutation {
  # Insert new CoOrganizerDetail
  insertCoOrganizerDetail(
    conference_id: ID!,
    name: String!,
    address: String!,
    email: String!,
    website: String!,
    phone: String!,
  ): CoOrganizerDetail!

  # Update CoOrganizerDetail info by id
  updateCoOrganizerDetail(
    id:ID!,
    conference_id: ID,
    name: String,
    address: String,
    email: String,
    website: String,
    phone: String,
  ): CoOrganizerDetail!

  # Delete CoOrganizerDetail by id
  deleteCoOrganizerDetail(id: ID!): CoOrganizerDetail!
}
`;
