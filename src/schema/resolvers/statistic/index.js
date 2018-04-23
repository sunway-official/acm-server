import attendeesStatistic from './attendees';
import topicsStatistic from './topics';

export const roundPercentageValue = value => Math.round(value * 10000) / 100;

export default {
  Statistic: {
    // Auto generate a random ID for each Statistic object
    id: () => Math.round(Math.random() * 100000),
  },
  Query: {
    ...attendeesStatistic,
    ...topicsStatistic,
  },
};
