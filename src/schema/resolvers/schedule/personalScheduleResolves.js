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
      { models: { PersonalSchedule }, ValidationError },
    ) => {
      try {
        const personalSchedules = await PersonalSchedule.query();
        return personalSchedules;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
    getPersonalScheduleByID: async (
      root,
      { id },
      { models: { PersonalSchedule }, ValidationError },
    ) => {
      try {
        const personalSchedule = await PersonalSchedule.query().findById(id);
        if (!personalSchedule) {
          throw new ValidationError('PersonalSchedule-not-found');
        }
        return personalSchedule;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
  },
  Mutation: {
    insertPersonalSchedule: async (
      root,
      data,
      { models: { PersonalSchedule }, ValidationError },
    ) => {
      try {
        const newPersonalSchedule = await PersonalSchedule.query().insert(data);

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
      { models: { PersonalSchedule }, ValidationError },
    ) => {
      try {
        // eslint-disable-next-line camelcase
        // if (schedule_id) {
        //   const { activity_id } = await Schedule.query().findById(schedule_id);
        //   Object.assign(data, data, {
        //     activity_id,
        //   });
        // }

        const updatePersonalSchedule = await PersonalSchedule.query().updateAndFetchById(
          data.id,
          data,
        );
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
      { models: { PersonalSchedule }, ValidationError },
    ) => {
      try {
        const personalSchedule = await PersonalSchedule.query().findById(id);
        if (personalSchedule) {
          await PersonalSchedule.query().deleteById(id);
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
