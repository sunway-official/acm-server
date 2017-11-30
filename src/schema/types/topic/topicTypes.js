export default `
type Topic {
  # The ID of Topic
  id: ID!

  # Conference ID
  conference: Conference!

  # name of Topic
  name: String!

  # description of Topic
  description: String!

  # color of topic
  color: Color!

  # color code of topic
  color_code: String!

  # check room is chosen
  is_chosen: Int!

}

extend type Query {
  # Get information about all Topic
  getAllTopics: [Topic!]!

  # Get Topic by ID
  getTopicByID(id: ID!): Topic!

  # Get information about all Topic
  getTopicsOfConference: [Topic!]!

}

extend type Mutation {
  # Insert new Topic
  insertTopicInConference( name: String!, description: String!, color_id: ID!): Topic!

  # Update Topic info by id
  updateTopicInConference(id:ID!, name: String, description: String, color_id: ID, is_chosen: Int): Topic!

  # Delete Topic by id
  deleteTopic(id: ID!): [Topic!]!
}
`;
