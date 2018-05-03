import { roundPercentageValue, mergeSmallStatisticItem } from '.';

export default {
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
