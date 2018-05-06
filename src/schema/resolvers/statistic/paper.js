import { roundPercentageValue, mergeSmallStatisticItem } from '.';

export default {
  getPaperStatisticByStatus: async (
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
        `select count(p.id) as total, p.status from papers as p where p.conference_id = '${
          user.current_conference_id
        }' group by p.status order by total DESC;`,
      );

      const sum = result.rows.reduce(
        (currentSum, { total }) => currentSum + Number(total),
        0,
      );

      return mergeSmallStatisticItem(
        result.rows.map(({ status, total }, index) => ({
          key: index + 1,
          value: total,
          label: status,
          percentage: roundPercentageValue(total / sum),
        })),
        minimumValue,
      );
    } catch (error) {
      throw new ValidationError(error);
    }
  },
  getPaperStatisticByReviews: async (
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
      const result = await Knex.raw(`Select p.title, pr.point from papers as p join paper_review_questions_points as pr on pr.paper_id = p.id join conferences as c
      on c.id = p.conference_id where c.id = '${
        user.current_conference_id
      }' order by pr.point DESC;`);

      const sum = result.rows.reduce(
        (currentSum, { point }) => currentSum + Number(point),
        0,
      );

      return mergeSmallStatisticItem(
        result.rows.map(({ title, point }, index) => ({
          key: index + 1,
          value: point,
          label: title,
          percentage: roundPercentageValue(point / sum),
        })),
        minimumValue,
      );
    } catch (error) {
      throw new ValidationError(error);
    }
  },
};
