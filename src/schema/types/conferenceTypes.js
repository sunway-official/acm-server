export default `
type Conference {
  # The ID of Conference
  id: ID!

  # Organizer id
  organizerDetail: OrganizerDetail!

  # Address id
  address: Address!

  # Id of person who creates the conference
  user: User!

  # Conference Topic ID
  conferenceTopics:[ConferenceTopic!]!

  # Conference Attendees ID
  conferenceAttendees:[ConferenceAttendee!]!

  # Conference news
  news:[News!]!

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

  # Get Conference by OrganizerDetail ID
  getConferenceByOrganizerDetailID( organizerDetail_id: ID!): [Conference!]!

  # Get Conference by Address ID
  getConferenceByAddressID( address_id: ID!): [Conference!]!

  # Get Conference by User ID
  getConferenceByUserID( user_id: ID! ): [Conference!]!

  # Get Conference by User ID and organizer detail
  getConferenceByUserIDOrganizerDetailID( user_id: ID!, organizerDetail_id: ID! ): Conference!

  # Get Conference by Address ID and organizer detail
  getConferenceByAddressIDOrganizerDetailID( address_id: ID!, organizerDetail_id: ID! ): Conference!

  # Get Conference by Address ID and user detail
  getConferenceByAddressIDUserID( address_id: ID!, user_id: ID! ): Conference!
}

extend type Mutation {
  # Insert new Conference
  insertConference(
    organizer_id: ID!,
    address_id: ID!,
    user_id: ID!,
    title: String!,
    description: String!,
    start_date: Date!,
    end_date: Date!,
    bg_image: String!,
  ): Conference!

  # Update Conference info by id
  updateConference(
    id: ID!,
    organizer_id: ID,
    address_id: ID,
    user_id: ID,
    title: String,
    description: String,
    start_date: Date,
    end_date: Date,
    bg_image: String,
  ): Conference!

  # Delete Conference by id
  deleteConference(id: ID!): Conference!
}
`;