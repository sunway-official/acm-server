export default `
type Conference {
  # The ID of Conference
  id: ID!

  # Organizer id
  OrganizerDetail: OrganizerDetail!

  # User id
  user: User!

  # Conference title
  title: String!

  # Conference description
  description: String!

  # Start date
  start_date: Date!

  # end date
  end_date: Date!

  # Conference image
  bg_image: String!
}

extend type Query {
  # Get information about all Conference
  getAllConferences: [Conference!]!

  # Get Conference by ID
  getConferenceByID(id: ID!): Conference!
}

extend type Mutation {
  # Insert new Conference
  insertConference(
    title: String!,
    description: String!,
    start_date: Date!,
    end_date: Date!,
    bg_image: String!,
    user_id: ID!,
    organizer_id: ID!,
  ): Conference!

  # Update Conference info by id
  updateConference(
    id: ID!,
    title: String!,
    description: String!,
    start_date: Date!,
    end_date: Date!,
    bg_image: String!,
    user_id: ID!,
    organizer_id: ID!,
  ): Conference!

  # Delete Conference by id
  deleteConference(id: ID!): Conference!
}
`;
