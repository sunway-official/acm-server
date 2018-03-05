export default `
type ConferenceAttendee {
  # The ID of Conference Attendee
  id: ID!

  # conference ID
  conference: Conference!

  # Attendee ID
  user: User!
}

extend type Query {
  # Get information about all ConferenceAttendee
  getAllConferenceAttendees: [ConferenceAttendee!]!

  # Get information about all Conference
  getAllConferencesByUserID: [ConferenceAttendee!]!

  # Get ConferenceAttendee by ID
  getConferenceAttendeeByID(id: ID!): ConferenceAttendee!

}

extend type Mutation {
  # Insert new ConferenceAttendee
  insertConferenceAttendee( conference_id: ID!, user_id: ID!): ConferenceAttendee!

  # Update ConferenceAttendee info by id
  updateConferenceAttendee( id:ID!, conference_id: ID, user_id: ID): ConferenceAttendee!

  # Delete ConferenceAttendee by id
  deleteConferenceAttendee( id: ID!): ConferenceAttendee!
}
`;
