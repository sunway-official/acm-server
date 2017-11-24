export default `
type PaperTopic {
  # ID of paper topic
  id: ID!

  # paper
  paper: Paper!

  # topic
  topic: Topic!

  # topic name
  topic_name: String!

  # topic description
  topic_description: String!

  # topic color code
  topic_color_code: String!
}


extend type Query {
  # get all papers topics
  getAllPapersTopics: [PaperTopic!]!

  # all topics by paper id
  getTopicsByPaperID(paper_id: ID!): [PaperTopic!]!
}

extend type Mutation {
  # insert Paper topic
  insertPaperTopic(paper_id: ID!, topic_id: ID!): PaperTopic!

  # update topic of paper
  updateTopicOfPaper(paper_id: ID!, topic_id: ID!): PaperTopic!

  # delete paper topic
  deletePaperTopic(id: ID!): PaperTopic!
}
`;
