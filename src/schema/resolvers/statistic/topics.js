import { roundPercentageValue, mergeSmallStatisticItem } from '.';

export default {
  getTopicsStatistic: async (
    root,
    { minimumValue },
    { models: { Paper }, ValidationError, user },
  ) => {
    if (!user) {
      throw new ValidationError('unauthorized');
    }
    if (user.current_conference_id === 0) {
      throw new ValidationError('no-current-conference');
    }
    try {
      const result = await Paper.query()
        .select(['topic_name'])
        .innerJoin('papers_topics', 'papers.id', 'papers_topics.paper_id')
        .where('conference_id', user.current_conference_id)
        .groupBy('topic_name')
        .count('papers.id');

      const sum = result.reduce(
        (currentSum, { count }) => currentSum + Number(count),
        0,
      );

      return mergeSmallStatisticItem(
        result.map(({ topic_name, count }, index) => ({
          key: index + 1,
          value: count,
          label: topic_name,
          percentage: roundPercentageValue(count / sum),
        })),
        minimumValue,
      );
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      throw new ValidationError(e);
    }
  },
};
