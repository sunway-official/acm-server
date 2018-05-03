export default `
type Statistic {
  id: ID!

  key: Int!

  value: Int!

  percentage: Float!

  label: String!
}

extend type Query {

  getAttendeesStatisticByOrganization(minimumValue: Float): [Statistic!]!

  getAttendeesStatisticByPosition(minimumValue: Float): [Statistic!]!

  getAttendeesStatisticByLanguage(minimumValue: Float): [Statistic!]!

  getAttendeesStatisticByTheirInteresting(minimumValue: Float): [Statistic!]!

  getTopicsStatistic(minimumValue: Float): [Statistic!]!

  getUserStatisticByTotalPhotos(minimumValue: Float): [Statistic!]!

  getPaperStatisticByReviews(minimumValue: Float = 0): [Statistic!]!
}
`;
