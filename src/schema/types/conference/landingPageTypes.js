export default `
type LandingPage {
  # The ID of landing page
  id: ID!

  # Conference id
  conference: Conference!

  # Slogan
  slogan: String!

  # register description
  register_description: String!

  # call paper description
  call_paper_description: String!

  # speaker description
  speaker_description: String!

  # email 
  email: String!

  # phone number 
  phone_number: String!

  # facebook_id
  facebook_id: String!
}

extend type Query {

  # Get info landing page by confernce_id
  getLandingPageByConferenceId(conference_id: ID!): [LandingPage!]

}

extend type Mutation {
  # Insert new Landing page
  insertLandingPage(
    conference_id: ID!,
    slogan: String!,
    register_description: String!,
    call_paper_description: String!,
    speaker_description: String!,
    email: String!,
    phone_number: String!,
    facebook_id: String!,
    twitter_id: String!,
    linkedin_id: String!,
  ): LandingPage!

  # Update CoOrganizerDetail info by id
  updateLandingPage(
    id:ID!,
    slogan: String,
    register_description: String,
    call_paper_description: String,
    speaker_description: String,
    email: String,
    phone_number: String,
    facebook_id: String,
    twitter_id: String,
    linkedin_id: String,
  ): LandingPage!

  # Delete landing page by id
  deleteLandingPage(id: ID!): LandingPage!
}
`;
