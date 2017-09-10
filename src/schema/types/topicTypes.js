export default `
type Topic {
  # The ID of Topic
  id: ID!

  # Conference Topic ID
  conferenceTopic:[ConferenceTopic!]!

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
  insertTopic( name: String!, description: String!): Topic!

  # Update Topic info by id
  updateTopic(id:ID!, name: String, description: String ): Topic!

  # Delete Topic by id
  deleteTopic(id: ID!): Topic!
}
`;
