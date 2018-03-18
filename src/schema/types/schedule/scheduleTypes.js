export default `
type Schedule {
  # The ID of Schedule
  id: ID!

  # schedule of activity
  activity: Activity!

  # activity id
  activity_id: ID!

  # paper id
  paper_id: ID!
  
  # activity title
  activity_title: String!

  # activity description
  activity_description: String!

  # activity status
  activity_status: Status!

  # conference
  conference: Conference!

  # room of activity in schedule
  room: Room!

  # room name
  room_name: String!

  # room seats
  room_seats: Int!

  # room status
  room_status: Status!

  # personal schedule
  personalSchedule: PersonalSchedule

  # start time of Schedule
  start: Date!

  # end time of Schedule
  end: Date!
  
  # topics
  topics: [PaperTopic!]!
 }

extend type Query {
  # Get information of all Schedule in current conference
  getAllSchedules: [Schedule!]!

  # Get Schedule by ID
  getScheduleByID(id: ID!): Schedule!

  # Get agenda in current conference based on topics
  # If there is no topics provided, the query will return all schedules
  getAgenda(topics: [ID!]): [Schedule!]!
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
