import attendeesStatistic from './attendees';
import topicsStatistic from './topics';
import paperStatistic from './paper';

export const roundPercentageValue = value => Math.round(value * 10000) / 100;

export const sumNumbers = (...args) => {
  let sum = 0;
  // eslint-disable-next-line
  for (const number of args) {
    sum += Number(number);
  }
  return sum;
};

export const mergeSmallStatisticItem = (statistics, minimumValue = 3) => {
  const SUM_KEY = 0;

  // Merge small statistic items into 1 key
  const result = statistics.reduce((prev, current) => {
    let sum = prev.filter(({ key }) => key === SUM_KEY)[0];
    if (current.percentage < minimumValue) {
      sum = {
        key: SUM_KEY,
        value: sumNumbers(sum ? sum.value : 0, current.value),
        label: 'Others',
        percentage: sumNumbers(sum ? sum.percentage : 0, current.percentage),
      };
      return [...prev.filter(({ key }) => key !== SUM_KEY), sum];
    }
    return [...prev, current];
  }, []);

  const otherItem = result.filter(({ key }) => key === SUM_KEY)[0];
  if (otherItem) {
    otherItem.percentage = Math.round(otherItem.percentage * 100) / 100;
  }

  // Move others to the last of array
  return result.sort(statistic => {
    if (statistic.key === SUM_KEY) return 1;
    return 0;
  });
};

export default {
  Statistic: {
    // Auto generate a random ID for each Statistic object
    id: () => Math.round(Math.random() * 100000),
  },
  Query: {
    ...attendeesStatistic,
    ...topicsStatistic,
    ...paperStatistic,
  },
};
