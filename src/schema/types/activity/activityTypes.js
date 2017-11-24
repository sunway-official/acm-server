export default `
type Activity {

  # ID of activity
  id: ID!

  # conferen have this activity
  conference: Conference!

  # paper
  paper: Paper!

  # all feedback of activity
  activityFeedback: [ActivityFeedback!]!

  # all schedules of activity
  schedules: [Schedule!]!

  # all question of activity
  questions: [Question!]!

  # title of this activity
  title: String!

  # description of this activity
  description: String!


}




extend type Query {
  # get all activities
  getAllActivities: [Activity!]!

  # get activity by id
  getActivityByID(id: ID!): Activity!

  # get all activities of one conference by conference_id
  getActivitiesByConferenceID( conference_id: ID): [Activity!]!
}

extend type Mutation {
  # insert activity with conference_id
  insertActivity(paper_id: ID!): Activity!

  # update activity with id
  updateActivity(id: ID!, paper_id: ID! ): Activity!

  # delete activity with id
  deleteActivity(id: ID!): Activity!
}
`;
