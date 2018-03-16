export default {
  PersonalSchedule: {
    schedule: async ({ schedule_id }, data, { models: { Schedule } }) => {
      const schedules = await Schedule.query().findById(schedule_id);
      return schedules;
    },
    activity: async ({ activity_id }, data, { models: { Activity } }) => {
      const activity = await Activity.query().findById(activity_id);
      return activity;
    },
    conference: async ({ conference_id }, data, { models: { Conference } }) => {
      const conference = await Conference.query().findById(conference_id);
      return conference;
    },
    user: async ({ user_id }, data, { models: { User } }) => {
      const user = await User.query().findById(user_id);
      return user;
    },
  },
  Query: {
    getAllPersonalSchedules: async (
      root,
      data,
      { models: { PersonalSchedule }, ValidationError, user },
    ) => {
      if (!user) {
        throw new ValidationError('unauthorized');
      }
      try {
        if (user.current_conference_id === 0) {
          throw new ValidationError('no-current-conference');
        }
        const personalSchedules = await PersonalSchedule.query()
          .where('user_id', user.id)
          .andWhere('conference_id', user.current_conference_id);
        return personalSchedules;
      } catch (e) {
        // eslint-disable-next-line no-console
        throw new ValidationError(e);
      }
    },
    getPersonalScheduleByID: async (
      root,
      { id },
      { models: { PersonalSchedule }, ValidationError, user },
    ) => {
      if (!user) {
        throw new ValidationError('unauthorized');
      }
      try {
        if (user.current_conference_id === 0) {
          throw new ValidationError('no-current-conference');
        }
        const personalSchedule = await PersonalSchedule.query()
          .where('user_id', user.id)
          .andWhere('id', id)
          .andWhere('conference_id', user.current_conference_id)
          .first();
        if (!personalSchedule) {
          throw new ValidationError('personal-chedule-not-found');
        }
        return personalSchedule;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
    getMyAgenda: (
      root,
      { topics = [] },
      { models: { PersonalSchedule }, ValidationError, user },
    ) => {
      if (!user) {
        throw new ValidationError('unauthorized');
      }
      if (user.current_conference_id === 0) {
        throw new ValidationError('no-current-conference');
      }
      try {
        const queryBuilder = PersonalSchedule.query()
          .where('user_id', user.id)
          .andWhere('conference_id', user.current_conference_id)
          .innerJoin(
            'papers_topics',
            'personal_schedules.paper_id',
            'papers_topics.paper_id',
          );

        topics.forEach(topic_id => {
          queryBuilder.orWhere('topic_id', topic_id);
        });

        return queryBuilder;
      } catch (e) {
        // eslint-disable-next-line no-console
        throw new ValidationError(e);
      }
    },
  },
  Mutation: {
    insertPersonalSchedule: async (
      root,
      data,
      { models: { PersonalSchedule }, ValidationError, user },
    ) => {
      if (!user) {
        throw new ValidationError('unauthorized');
      }
      try {
        const newPersonalSchedule = await PersonalSchedule.query().insert({
          ...data,
          user_id: user.id,
        });

        return newPersonalSchedule;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
    updatePersonalSchedule: async (
      root,
      data,
      { models: { PersonalSchedule }, ValidationError, user },
    ) => {
      if (!user) {
        throw new ValidationError('unauthorized');
      }
      try {
        const updatePersonalSchedule = await PersonalSchedule.query()
          .where('user_id', user.id)
          .updateAndFetchById(data.id, data);
        return updatePersonalSchedule;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
    deletePersonalSchedule: async (
      root,
      { id },
      { models: { PersonalSchedule }, ValidationError, user },
    ) => {
      if (!user) {
        throw new ValidationError('unauthorized');
      }
      try {
        const personalSchedule = await PersonalSchedule.query()
          .where('user_id', user.id)
          .andWhere('id', id)
          .first();
        if (personalSchedule) {
          await PersonalSchedule.query()
            .where('user_id', user.id)
            .andWhere('id', id)
            .deleteById(id);
        }
        return personalSchedule;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
  },
};
