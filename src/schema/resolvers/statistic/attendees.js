import { roundPercentageValue, mergeSmallStatisticItem } from '.';

export default {
  getAttendeesStatisticByLikes: async (
    root,
    { minimumValue = 0 },
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
        `select count(nl.id) as total_likes, u.username from news_likes as nl join news as n on n.id = nl.news_id join users as u on u.id = n.user_id where n.conference_id = '${
          user.current_conference_id
        }'
        group by u.username order by total_likes DESC;`,
      );

      const sum = result.rows.reduce(
        (currentSum, { total_likes }) => currentSum + Number(total_likes),
        0,
      );

      return mergeSmallStatisticItem(
        result.rows.map(({ username, total_likes }, index) => ({
          key: index + 1,
          value: total_likes,
          label: username,
          percentage: roundPercentageValue(total_likes / sum),
        })),
        minimumValue,
      );
    } catch (error) {
      throw new ValidationError(error);
    }
  },
  getAttendeesStatisticByRating: async (
    root,
    { minimumValue = 0 },
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
        `select u.username, cur.rating from users as u join conference_user_ratings as cur on cur.user_id = u.id join conferences_attendees as ca on ca.user_id = u.id
        where ca.conference_id = '${
          user.current_conference_id
        }' and cur.rating > 0 order by cur.rating DESC;`,
      );

      const sum = result.rows.reduce(
        (currentSum, { rating }) => currentSum + Number(rating),
        0,
      );

      return mergeSmallStatisticItem(
        result.rows.map(({ username, rating }, index) => ({
          key: index + 1,
          value: rating,
          label: username,
          percentage: roundPercentageValue(rating / sum),
        })),
        minimumValue,
      );
    } catch (error) {
      throw new ValidationError(error);
    }
  },
  getAttendeesStatisticByTotalComments: async (
    root,
    { minimumValue = 0 },
    { Knex, ValidationError, user },
  ) => {
    if (!user) {
      throw new ValidationError('unauthorized');
    }
    if (user.current_conference_id === 0) {
      throw new ValidationError('no-current-conference');
    }
    try {
      const result = await Knex.raw(`select u.username, count(nc.id) as total_comments from users as u join news as n on n.user_id = u.id join news_comments as nc on nc.news_id = n.id
      join conferences_attendees as ca on ca.user_id = u.id where ca.conference_id = '${
        user.current_conference_id
      }' group by u.username order by total_comments DESC;`);

      const sum = result.rows.reduce(
        (currentSum, { total_comments }) => currentSum + Number(total_comments),
        0,
      );

      return mergeSmallStatisticItem(
        result.rows.map(({ username, total_comments }, index) => ({
          key: index + 1,
          value: total_comments,
          label: username,
          percentage: roundPercentageValue(total_comments / sum),
        })),
        minimumValue,
      );
    } catch (error) {
      throw new ValidationError(error);
    }
  },
  getAttendeesStatisticByTotalPhotos: async (
    root,
    { minimumValue = 0 },
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
        `Select users.username as user_name, Count(news_photos.id) as total_photos from news_photos join news on news.id = news_photos.news_id join users on users.id = news.user_id
        join conferences_attendees as ca on ca.user_id = users.id where ca.conference_id = '${
          user.current_conference_id
        }' group by users.username order by total_photos DESC;`,
      );

      const sum = result.rows.reduce(
        (currentSum, { total_photos }) => currentSum + Number(total_photos),
        0,
      );

      return mergeSmallStatisticItem(
        result.rows.map(({ user_name, total_photos }, index) => ({
          key: index + 1,
          value: total_photos,
          label: user_name,
          percentage: roundPercentageValue(total_photos / sum),
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
