export default `
type Topic {
  # The ID of Topic
  id: ID!

  # name of Topic
  name: String!

  # description of Topic
  description: String!

}

extend type Query {
  # Get information about all Topic
  getAllTopics: [Topic!]!

  # Get Topic by ID
  getTopicByID(id: ID!): Topic!
}

extend type Mutation {
  # Insert new Topic
  insertTopic( name: String!, desciption: String!): Topic!

  # Update Topic info by id
  updateTopic(id:ID!, name: String, desciption: String ): Topic!

  # Delete Topic by id
  deleteTopic(id: ID!): Topic!
}
`;
