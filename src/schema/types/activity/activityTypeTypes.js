export default `
type ActivityType {
  # ID of activity type
  id: ID!

  # name of activity type
  name: String!

  # all activities of type
  activities: [Activity!]!

}

extend type Query {
  # get all activity types
  getAllActivityTypes: [ActivityType!]!

  # get activity type by id
  getActivityTypeByID(id: ID!): ActivityType!
}

extend type Mutation {
  # insert activity type
  insertActivityType(name: String!): ActivityType!

  # update activity type
  updateActivityType(id: ID!, name: String!): ActivityType!

  # delete activity type
  deleteActivityType(id: ID!): ActivityType!
}
`;
