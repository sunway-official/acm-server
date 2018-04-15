export default `
type Conference {
  # The ID of Conference
  id: ID!

  # Organizer id
  organizerDetail: OrganizerDetail!

  category_id: Int!

  category_name: String!

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

  # papers
  papers: [Paper!]!

  # rooms
  rooms: [Room!]!

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

  # deadline submit abstract
  dl_submit_abstract: Date!

  # deadline review abstract
  dl_review_abstract: Date!

  # deadline release abstract
  dl_release_abstract: Date!

  # deadline re-submit abstract
  dl_re_submit_abstract: Date!

  # deadline re-review abstract
  dl_re_review_abstract: Date!

  # deadline release final abstract
  dl_release_final_abstract: Date!

  # deadline submit paper
  dl_submit_paper: Date!

  # deadline review paper
  dl_review_paper: Date!

  # deadline release paper
  dl_release_paper: Date!

  # deadline re-submit paper
  dl_re_submit_paper: Date!

  # deadline re-review paper
  dl_re_review_paper: Date!

  # deadline release final paper
  dl_release_final_paper: Date!

  # deadline registration
  dl_registration: Date!

}

extend type Query {
  # Get information about all Conference
  getAllConferences: [Conference!]!

  # Get Conference by ID
  getConferenceByID(id: ID!): Conference!

  # get current conference
  getCurrentConference: Conference!

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
    category_id: Int!,
    address_id: ID!,
    title: String!,
    description: String!,
    start_date: Date!,
    end_date: Date!,
    bg_image: String,
    dl_submit_abstract: Date!,
    dl_review_abstract: Date!,
    dl_release_abstract: Date!,
    dl_re_submit_abstract: Date!,
    dl_re_review_abstract: Date!,
    dl_release_final_abstract: Date!,
    dl_submit_paper: Date!,
    dl_review_paper: Date!,
    dl_release_paper: Date!,
    dl_re_submit_paper: Date!,
    dl_re_review_paper: Date!,
    dl_release_final_paper: Date!,
    dl_registration: Date!,

  ): Conference!

  # Update Conference info by id
  updateConference(
    id: ID,
    organizer_detail_id: ID,
    category_id: Int,
    address_id: ID,
    title: String,
    description: String,
    start_date: Date,
    end_date: Date,
    bg_image: String,
    dl_submit_abstract: Date,
    dl_review_abstract: Date,
    dl_release_abstract: Date,
    dl_re_submit_abstract: Date,
    dl_re_review_abstract: Date,
    dl_release_final_abstract: Date,
    dl_submit_paper: Date,
    dl_review_paper: Date,
    dl_release_paper: Date,
    dl_re_submit_paper: Date,
    dl_re_review_paper: Date,
    dl_release_final_paper: Date,
    dl_registration: Date,
  ): Conference!

  # Delete Conference by id
  deleteConference(id: ID!): Conference!
}
`;
