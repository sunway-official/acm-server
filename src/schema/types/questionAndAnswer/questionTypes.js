export default `
type Question {
  # The ID of Question
  id: ID!

  # User ID
  user: User!

  # Activity ID
  activity: Activity!

  # Question content
  content:String!

  # Document created_at timestamp
  created_at: Date!

}

extend type Query {
  # Get information about all Questions
  getAllQuestions: [Question!]!

  # Get Question by ID
  getQuestionByID( id: ID!): Question!

  # Get Question by activity ID
  getQuestionByActivityID( activity_id: ID! ): [Question!]!

  # Get Question by user ID
  getQuestionByUserID( user_id: ID! ): [Question!]!
}

extend type Mutation {
  # Insert new Question
  insertQuestion( user_id: ID!, activity_id: ID!, content: String! ): Question!

  # Update Question info by id
  updateQuestion( id:ID!, activity_id: ID, content: String ): Question!

  # Delete Question by id
  deleteQuestion( id: ID! ): Question!
}
`;
