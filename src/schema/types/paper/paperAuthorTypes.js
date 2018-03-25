export default `
type PaperAuthor {
  # ID of paper author
  id: ID!

  # paper
  paper: Paper!

  conference_id: ID!

  # author name
  author_name: String!

  # author email
  author_email: String!

  # coresponding
  corresponding: Int!

  # author title
  author_title: String!

  # author organization
  author_organization: String!

  # author street
  author_street: String!

  # author city
  author_city: String!

  # author country
  author_country: String!

  # paper status
  paper_status: String!
}


extend type Query {
  getAllPapersAuthors: [PaperAuthor!]!

  # all authors by paper id
  getAuthorsByPaperID(paper_id: ID!): [PaperAuthor!]!
}

extend type Mutation {
  # insert Paper author
  insertPaperAuthor(paper_id: ID!, user_id: ID, corresponding: Int, author_name: String,
    author_email: String, author_title: String, author_organization: String, author_street: String,
    author_city: String,author_country: String): PaperAuthor!

  # update author of paper
  updateAuthorOfPaper(paper_id: ID!, user_id: ID!): PaperAuthor!

  # delete paper author
  deletePaperAuthor(id: ID!): PaperAuthor!
}
`;
