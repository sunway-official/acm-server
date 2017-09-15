export default `
type ActivityTopic {
  # ID of activity topic
  id: ID!

  # activity
  activity: Activity!

  # topic
  topic: Topic!
}

extend type Query {
  # get all activity topics
  getAllActivityTopics: [ActivityTopic!]!

  # get activity topics by id
  getActivityTopicByID(id: ID!): ActivityTopic!

}

extend type Mutation {
  # insert Activity topic
  insertActivityTopic(activity_id: ID!, topic_id: ID!): ActivityTopic!
  updateActivityTopic(id: ID!,activity_id: ID!, topic_id: ID!): ActivityTopic!
  deleteActivityTopic(id: ID!): ActivityTopic!
}
`;
