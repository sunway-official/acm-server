export default `
type PaperAuthor {
  # ID of paper author
  id: ID!

  # paper
  paper: Paper!

  # author name
  author_name: String!

  # author email
  author_email: String!

  # author title
  author_title: String!

  # author organizer
  author_organizer: String!

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
    author_email: String, author_title: String, author_organizer: String, author_country: String,
    paper_status: String): PaperAuthor!

  # update author of paper
  updateAuthorOfPaper(paper_id: ID!, user_id: ID!): PaperAuthor!

  # delete paper author
  deletePaperAuthor(id: ID!): PaperAuthor!
}
`;
