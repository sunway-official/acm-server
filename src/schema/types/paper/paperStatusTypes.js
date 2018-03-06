export default `
  type PaperStatus {
    id: ID!

    name: String!

    # Document created_at timestamp
    created_at: Date!

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
