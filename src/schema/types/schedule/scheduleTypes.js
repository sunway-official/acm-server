export default `
type Schedule {
  # The ID of Schedule
  id: ID!

  # schedule of activity
  activity: Activity!

  # activity title
  activity_title: String!

  # activity description
  activity_description: String!

  # activity status
  activity_status: Status!

  # conference
  conference: Conference!

  # start
  start: String!

  # end
  end: String!

  # room of activity in schedule
  room: Room!

  # room name
  room_name: String!

  # room seats
  room_seats: Int!

  # room status
  room_status: Status!

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
