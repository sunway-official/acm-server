const roundPercentageValue = value => Math.round(value * 10000) / 100;

export default {
  Statistic: {
    // Auto generate a random ID for each Statistic object
    id: () => Math.round(Math.random() * 100000),
  },
  Query: {
    getAttendeesStatistic: async (
      root,
      data,
      { models: { User }, ValidationError, user },
    ) => {
      if (!user) {
        throw new ValidationError('unauthorized');
      }
      if (user.current_conference_id === 0) {
        throw new ValidationError('no-current-conference');
      }
      try {
        const result = await User.query()
          .select(['organization'])
          .innerJoin(
            'conferences_attendees',
            'users.id',
            'conferences_attendees.user_id',
          )
          .where('conference_id', user.current_conference_id)
          .groupBy('organization')
          .count('user_id');

        const sum = result.reduce(
          (currentSum, { count }) => currentSum + Number(count),
          0,
        );

        return result.map(({ organization, count }, index) => ({
          key: index + 1,
          value: count,
          label: organization,
          percentage: roundPercentageValue(count / sum),
        }));
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
  },
};
