export default `
type Conference {
  # The ID of Conference
  id: ID!

  # Organizer id
  organizerDetail: OrganizerDetail!

  # Address id
  address: Address!

  # Id of person who creates the conference _ in organizer detail
  user: User!

  # Conference Attendees ID
  conferenceAttendees:[ConferenceAttendee!]!

  # Conference news
  news:[News!]!

  # conference activities
  activities:[Activity!]!

  # topics
  topics: [Topic!]!

  # CoOrganizerDetail
  coOrganizerDetails: [CoOrganizerDetail!]!

  # landingPage
  landingPage: LandingPage!

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
  getConferenceByOrganizerDetailID( organizer_detail_id: ID!): [Conference!]!

  # Get Conference by Address ID
  getConferenceByAddressID( address_id: ID!): [Conference!]!

  # Get Conference by User ID
  getConferenceByUserID( user_id: ID! ): [Conference!]!

  # Get Conference by Address ID and organizer detail
  getConferenceByAddressIDOrganizerDetailID( address_id: ID!, organizer_detail_id: ID! ): Conference!
}

extend type Mutation {
  # Insert new Conference
  insertConference(
    organizer_detail_id: ID!,
    address_id: ID!,
    title: String!,
    description: String!,
    start_date: Date!,
    end_date: Date!,
    bg_image: String!,
  ): Conference!

  # Update Conference info by id
  updateConference(
    id: ID!,
    organizer_detail_id: ID,
    address_id: ID,
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
