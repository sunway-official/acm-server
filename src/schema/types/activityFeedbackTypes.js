export default `
type ActivityFeedback {
  # ID of activity feedback
  id: ID!

  # feedback of activity
  activity: Activity!

  # user send feedback talk about this activity
  user: User!

  # content of feedback talk about this activity
  content: String!

  # rating of activity
  rating: Float!

  # created at
  created_at: Date!

}

extend type Query {
  # get all activity feedback
  getAllActivityFeedback: [ActivityFeedback!]!

  #get activity feedback by id
  getActivityFeedbackByID(id: ID!): ActivityFeedback!

  # get all feedback of user in many activities
  getAllActivityFeedbackByUserID(user_id: ID!): [ActivityFeedback!]!

  # get all feedback of activity (many user)
  getAllActivityFeedbackByActivityID(activity_id: ID!): [ActivityFeedback!]!

  # get all feedback of user in one activity
  getAllActivityFeedbackByActivityIDUserID(activity_id: ID!, user_id: ID!): [ActivityFeedback!]!
}

extend type Mutation {
  # insert activity feedback
  insertActivityFeedback(activity_id: ID!, user_id: ID!, content: String!, rating: Float!): ActivityFeedback!

  # update activity feedback
  updateActivityFeedback(id: ID!, content: String, rating: Float): ActivityFeedback!

  # delete activity feedback
  deleteActivityFeedback(id: ID!): ActivityFeedback!

}
`;
