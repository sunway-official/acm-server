export default `
type Statistic {
  id: ID!

  key: Int!

  value: Int!

  percentage: Float!

  label: String!
}

extend type Query {

  getAttendeesStatisticByOrganization: [Statistic!]!

  getAttendeesStatisticByPosition: [Statistic!]!

  getTopicsStatistic: [Statistic!]!
}
`;
