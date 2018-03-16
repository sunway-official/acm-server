export default `
type PersonalSchedule {
  # The ID of PersonalSchedule
  id: ID!

  # user of PersonalSchedule
  user: User!

  # schedule of personal
  schedule: Schedule!

  # activity id
  activity_id: ID!
  
  # paper id
  paper_id: ID!

  # schedule_id
  schedule_id: ID!

  # actity 
  activity: Activity!

  # conference 
  conference: Conference!

  # start
  start: Date!

  # end
  end: Date!

  # activity title
  activity_title: String!

  # activity description
  activity_description: String!

  # activity status
  activity_status: Status!

  # conference 
  conference: Conference!

  # room name
  room_name: String!

  # room seats
  room_seats: Int!

  # room status
  room_status: Status!
  
  # topics
  topics: [PaperTopic!]!
}

extend type Query {
  # Get information about all PersonalSchedule
  getAllPersonalSchedules: [PersonalSchedule!]!

  # Get PersonalSchedule by ID
  getPersonalScheduleByID(id: ID!): PersonalSchedule!
  
  # Get personal agenda in current conference based on topics
  # If there is no topics provided, the query will return all schedules
  getMyAgenda(topics: [ID!]): [PersonalSchedule!]!
}

extend type Mutation {
  # Insert new PersonalSchedule
  insertPersonalSchedule(schedule_id: ID! ): PersonalSchedule!

  # Update PersonalSchedule info by id
  updatePersonalSchedule(id:ID!, schedule_id: ID ): PersonalSchedule!

  # Delete PersonalSchedule by id
  deletePersonalSchedule(id: ID!): PersonalSchedule!
}
`;
