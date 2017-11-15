export default `

extend type Query {
  getAllParticipantsInConference(conference_id: ID!) : [User!]!
}
`;
