export default `
type OrganizerDetail {
  # The ID of Organizer
  id: ID!

  # Organizer id
  user: User!

  # Organizer name
  name: String!

  # Organizer email
  email: String!

  # Organizer address
  address: String!

  # Organizer website
  website: String!

  # Organizer phone
  phone: String!

  # conference
  conferences: [Conference!]!
}

extend type Query {
  # Get information about all Organizer
  getAllOrganizerDetails: [OrganizerDetail!]!

  # Get OrganizerDetail by ID
  getOrganizerDetailByID(id: ID!): OrganizerDetail!

  # Get OrganizerDetail by user ID
  getOrganizerDetailByUserID(user_id: ID!): OrganizerDetail!
}

extend type Mutation {
  # Insert new Organizer
  insertOrganizerDetail(
    user_id: ID!,
    name: String!,
    email: String!,
    address: String!,
    website: String!,
    phone: String!
  ): OrganizerDetail!

  # Update OrganizerDetail info by id
  updateOrganizerDetail(
    id: ID!,
    user_id: ID,
    name: String ,
    email: String,
    address: String,
    website: String,
    phone: String
  ): OrganizerDetail!

  # Delete OrganizerDetail by id
  deleteOrganizerDetail(id: ID!): OrganizerDetail!
}
`;
