export default `
type Activity {

  # ID of activity
  id: ID!

  # conferen have this activity
  conference: Conference!

  # type of this activity
  activityType: ActivityType!

  # all topics of activity
  activityTopics: [ActivityTopic!]!

  # all feedback of activity
  activityFeedback: [ActivityFeedback!]!

  # all schedules of activity
  schedules: [Schedule!]!

  # title of this activity
  title: String!

  # status of this activity
  # status 'on' or 'off'
  status: Status!


}




extend type Query {
  # get all activities
  getAllActivities: [Activity!]!

  # get activity by id
  getActivityByID(id: ID!): Activity!

  # get all activities of one conference by conference_id
  getActivitiesByConferenceID(conference_id: ID!): [Activity!]!
}

extend type Mutation {
  # insert activity with conference_id, activity_type_id, title and status
  insertActivity(conference_id: ID!, activity_type_id: ID!, title: String!, status:Status): Activity!

  # update activity with id, activity_type_id, title and status
  updateActivity(id: ID!, activity_type_id: ID, title: String, status:Status): Activity!

  # delete activity with id
  deleteActivity(id: ID!): Activity!
}
`;
