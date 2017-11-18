export default {
  Schedule: {
    room: async ({ room_id }, data, { models: { Room } }) => {
      const room = await Room.query().findById(room_id);
      return room;
    },
    activity: async ({ activity_id }, data, { models: { Activity } }) => {
      const activity = await Activity.query().findById(activity_id);
      return activity;
    },
    conference: async ({ conference_id }, data, { models: { Conference } }) => {
      const conference = await Conference.query().findById(conference_id);
      return conference;
    },
    personalSchedule: async (
      { id },
      data,
      { models: { PersonalSchedule }, ValidationError, user },
    ) => {
      if (!user) {
        throw new ValidationError('unauthorized');
      }
      const personalSchedules = await PersonalSchedule.query()
        .where('schedule_id', id)
        .andWhere('user_id', user.id)
        .first();
      return personalSchedules;
    },
  },
  Query: {
    getAllSchedules: async (
      root,
      data,
      { models: { Schedule }, ValidationError, user },
    ) => {
      if (!user) {
        throw new ValidationError('unauthorized');
      }
      try {
        if (user.current_conference_id === 0) {
          throw new ValidationError('no-current-conference');
        }
        const schedules = await Schedule.query()
          .where('conference_id', user.current_conference_id)
          .orderBy('start', 'desc');
        return schedules;
      } catch (e) {
        // eslint-disable-next-line no-console
        throw new ValidationError(e);
      }
    },
    getScheduleByID: async (
      root,
      { id },
      { models: { Schedule }, ValidationError },
    ) => {
      try {
        const schedule = await Schedule.query().findById(id);
        if (!schedule) {
          throw new ValidationError('Schedule-not-found');
        }
        return schedule;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
  },
  Mutation: {
    insertSchedule: async (
      root,
      data,
      { models: { Schedule }, ValidationError, user },
    ) => {
      try {
        if (!user) {
          throw new ValidationError('unauthorized');
        }
        // eslint-disable-next-line
        const conference_id = user.current_conference_id;
        // eslint-disable-next-line
        data.conference_id = conference_id;
        const newSchedule = await Schedule.query().insert(data);
        return newSchedule;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
    updateSchedule: async (
      root,
      data,
      { models: { Schedule }, ValidationError },
    ) => {
      try {
        const updateSchedule = await Schedule.query().updateAndFetchById(
          data.id,
          data,
        );
        return updateSchedule;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
    deleteSchedule: async (
      root,
      { id },
      { models: { Schedule }, ValidationError },
    ) => {
      try {
        const schedule = await Schedule.query().findById(id);

        // delete all personanl schedule with scheduleID
        await schedule.deletePersonalSchedule();

        // delete schedule
        if (schedule) {
          await Schedule.query().deleteById(id);
        }
        return schedule;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
  },
};
