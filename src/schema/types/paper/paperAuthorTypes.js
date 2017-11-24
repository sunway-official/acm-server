export default `
type PaperAuthor {
  # ID of paper author
  id: ID!

  # paper
  paper: Paper!

  # author
  author: Author!

  # author name
  author_name: String!

  # author email
  author_email: String!

  # author title
  author_title: String!
}


extend type Query {
  getAllPapersAuthors: [PaperAuthor!]!

  # all authors by paper id
  getAuthorsByPaperID(paper_id: ID!): [PaperAuthor!]!
}

extend type Mutation {
  # insert Paper author
  insertPaperAuthor(paper_id: ID!, author_id: ID!): PaperAuthor!

  # update author of paper
  updateAuthorOfPaper(paper_id: ID!, author_id: ID!): PaperAuthor!

  # delete paper author
  deletePaperAuthor(id: ID!): PaperAuthor!
}
`;
