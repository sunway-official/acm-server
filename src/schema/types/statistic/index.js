export default `
type Statistic {
  id: ID!

  key: Int!

  value: Float!

  percentage: Float!

  label: String!
}

extend type Query {

  getAttendeesStatisticByOrganization(minimumValue: Float): [Statistic!]!

  getAttendeesStatisticByPosition(minimumValue: Float): [Statistic!]!

  getAttendeesStatisticByLanguage(minimumValue: Float): [Statistic!]!

  getAttendeesStatisticByTheirInteresting(minimumValue: Float): [Statistic!]!

  getTopicsStatistic(minimumValue: Float): [Statistic!]!

  getAttendeesStatisticByTotalPhotos(minimumValue: Float): [Statistic!]!

  getAttendeesStatisticByTotalComments(minimumValue: Float = 0): [Statistic!]!

  getPaperStatisticByReviews(minimumValue: Float = 0): [Statistic!]!

  getAttendeesStatisticByRating(minimumValue: Float = 0): [Statistic!]!
}
`;
