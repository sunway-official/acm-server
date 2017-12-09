export default `
type Activity {

  # ID of activity
  id: ID!

  # conferen have this activity
  conference: Conference!

  # paper id
  paper_id: ID!

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
  # insert activity with paper_id
  insertActivityWithPaperID(paper_id: ID!): Activity!

  # insert actitivy with title, description
  insertActivity(title: String! , description: String): Activity!

  # update activity with paper_id
  updateActivityWithPaperID(id: ID!, paper_id: ID! ): Activity!

  # update activity with title and description
  updateActivity(id: ID!, title: String , description: String): Activity!

  # delete activity with id
  deleteActivity(id: ID!): Activity!
}
`;
