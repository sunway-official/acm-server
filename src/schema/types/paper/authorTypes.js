export default `
type Author {
  # The ID of Author
  id: ID!

  # author name
  name: String!

  # author email
  email: String!

  # author title
  title: String!

}

extend type Query {
  # Get information about all Authors
  getAllAuthors: [Author!]!

  # Get Author by ID
  getAuthorByID( id: ID!): Author!

}

extend type Mutation {
  # Insert new Author
  insertAuthor(  name: String!,  email: String!, title: String! ): Author!

  # Update Author info by id
  updateAuthor( id:ID!, name: String,  email: String, title: String ): Author!

  # Delete Author by id
  deleteAuthor( id: ID! ): Author!
}
`;
