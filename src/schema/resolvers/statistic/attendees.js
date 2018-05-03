import { roundPercentageValue, mergeSmallStatisticItem } from '.';

export default {
  getUserStatisticByTotalPhotos: async (
    root,
    { minimumValue },
    { Knex, ValidationError, user },
  ) => {
    if (!user) {
      throw new ValidationError('unauthorized');
    }
    if (user.current_conference_id === 0) {
      throw new ValidationError('no-current-conference');
    }
    try {
      const result = await Knex.raw(
        `Select users.username as user_name, Count(news_photos.id) from news_photos join news on news.id = news_photos.news_id join users on users.id = news.user_id group by users.username;`,
      );

      console.log(result);

      const sum = result.rows.reduce(
        (currentSum, { count }) => currentSum + Number(count),
        0,
      );

      return mergeSmallStatisticItem(
        result.rows.map(({ user_name, count }, index) => ({
          key: index + 1,
          value: count,
          label: user_name,
          percentage: roundPercentageValue(count / sum),
        })),
        minimumValue,
      );
    } catch (error) {
      throw new ValidationError(error);
    }
  },
  getAttendeesStatisticByOrganization: async (
    root,
    { minimumValue },
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

      return mergeSmallStatisticItem(
        result.map(({ organization, count }, index) => ({
          key: index + 1,
          value: count,
          label: organization,
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
  getAttendeesStatisticByPosition: async (
    root,
    { minimumValue },
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
        .select(['position'])
        .innerJoin(
          'conferences_attendees',
          'users.id',
          'conferences_attendees.user_id',
        )
        .where('conference_id', user.current_conference_id)
        .groupBy('position')
        .count('user_id');

      const sum = result.reduce(
        (currentSum, { count }) => currentSum + Number(count),
        0,
      );

      return mergeSmallStatisticItem(
        result.map(({ position, count }, index) => ({
          key: index + 1,
          value: count,
          label: position,
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
  getAttendeesStatisticByLanguage: async (
    root,
    { minimumValue },
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
        .select(['language'])
        .innerJoin(
          'conferences_attendees',
          'users.id',
          'conferences_attendees.user_id',
        )
        .where('conference_id', user.current_conference_id)
        .groupBy('language')
        .count('user_id');

      const sum = result.reduce(
        (currentSum, { count }) => currentSum + Number(count),
        0,
      );

      return mergeSmallStatisticItem(
        result.map(({ language, count }, index) => ({
          key: index + 1,
          value: count,
          label: language,
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
  getAttendeesStatisticByTheirInteresting: async (
    root,
    { minimumValue },
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
        .select(['interested_in'])
        .innerJoin(
          'conferences_attendees',
          'users.id',
          'conferences_attendees.user_id',
        )
        .where('conference_id', user.current_conference_id)
        .groupBy('interested_in')
        .count('user_id');

      const sum = result.reduce(
        (currentSum, { count }) => currentSum + Number(count),
        0,
      );

      return mergeSmallStatisticItem(
        result.map(({ interested_in, count }, index) => ({
          key: index + 1,
          value: count,
          label: interested_in || '',
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
