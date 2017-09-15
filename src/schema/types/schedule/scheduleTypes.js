export default `
type Schedule {
  # The ID of Schedule
  id: ID!

  # room of activity in schedule
  room: Room!

  # schedule of activity
  activity: Activity!

  # personal schedule
  personalSchedules: [PersonalSchedule!]!

  # start time of Schedule
  start: Date!

  # end time of Schedule
  end: Date!


}

extend type Query {
  # Get information about all Schedule
  getAllSchedules: [Schedule!]!

  # Get Schedule by ID
  getScheduleByID(id: ID!): Schedule!

}

extend type Mutation {
  # Insert new Schedule
  insertSchedule( activity_id: ID!, room_id: ID! ,start: Date!, end: Date!): Schedule!

  # Update Schedule info by id
  updateSchedule(id:ID!, activity_id: ID, room_id: ID, start: Date, end: Date ): Schedule!

  # Delete Schedule by id
  deleteSchedule(id: ID!): Schedule!
}
`;
