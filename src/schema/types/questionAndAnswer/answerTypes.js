export default `
type Answer {
  # The ID of Answer
  id: ID!

  # User ID
  user: User!

  # Question ID
  question: Question!

  # Answer content
  content:String!

  # Document created_at timestamp
  created_at: Date!

}

extend type Query {
  # Get information about all Answers
  getAllAnswers: [Answer!]!

  # Get Answer by ID
  getAnswerByID( id: ID!): Answer!

  # Get Answer by Question ID
  getAnswerByQuestionID( question_id: ID! ): [Answer!]!

  # Get Answer by user ID
  getAnswerByUserID( user_id: ID! ): [Answer!]!
}

extend type Mutation {
  # Insert new Answer
  insertAnswer( user_id:ID!, question_id: ID!, content: String! ): Answer!

  # Update Answer info by id
  updateAnswer( id:ID!, user_id:ID, question_id: ID, content: String ): Answer!

  # Delete Answer by id
  deleteAnswer( id: ID! ): Answer!
}
`;
