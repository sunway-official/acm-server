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
    personalSchedules: async (
      { id },
      data,
      { models: { PersonalSchedule } },
    ) => {
      const personalSchedules = await PersonalSchedule.query().where(
        'schedule_id',
        id,
      );
      return personalSchedules;
    },
  },
  Query: {
    getAllSchedules: async (
      root,
      data,
      { models: { Schedule }, ValidationError },
    ) => {
      try {
        const schedules = await Schedule.query();
        return schedules;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
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
      { models: { Schedule }, ValidationError },
    ) => {
      try {
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
