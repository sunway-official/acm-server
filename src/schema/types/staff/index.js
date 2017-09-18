export default `

extend type Query {
  getAllStaffInConference(conference_id: ID!) : [User!]!
}
`;
