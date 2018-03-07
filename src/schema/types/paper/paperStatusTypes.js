export default `
  type PaperStatus {
    id: ID!

    # Name of status
    name: String!

    # Document created_at timestamp
    created_at: Date!

    # List papers have the same status
    papers: [Paper!]!

    # Document updated_at timestamp
    updated_at: Date!
  }

  extend type Query {
    # Get status by ID
    getPaperStatusByID( id: ID!): PaperStatus!

    # Get all status
    getAllPaperStatus: [PaperStatus!]!
  }
`;
