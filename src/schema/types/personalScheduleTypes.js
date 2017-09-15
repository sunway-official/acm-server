export default `
type PersonalSchedule {
  # The ID of PersonalSchedule
  id: ID!

  # user of PersonalSchedule
  user: User!

  # schedule of personal
  schedule: Schedule!

  activity: Activity!


}

extend type Query {
  # Get information about all PersonalSchedule
  getAllPersonalSchedules: [PersonalSchedule!]!

  # Get PersonalSchedule by ID
  getPersonalScheduleByID(id: ID!): PersonalSchedule!
}

extend type Mutation {
  # Insert new PersonalSchedule
  insertPersonalSchedule( user_id: ID!, schedule_id: ID! ): PersonalSchedule!

  # Update PersonalSchedule info by id
  updatePersonalSchedule(id:ID!, user_id: ID, schedule_id: ID ): PersonalSchedule!

  # Delete PersonalSchedule by id
  deletePersonalSchedule(id: ID!): PersonalSchedule!
}
`;
