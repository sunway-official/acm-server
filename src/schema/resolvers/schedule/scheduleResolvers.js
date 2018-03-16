import Expo from 'expo-server-sdk';
import handlePushNofication from '../../../services/handlePushNofication';

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
    topics: async ({ paper_id }, data, { models: { PaperTopic } }) => {
      const topics = await PaperTopic.query().where('paper_id', paper_id);
      return topics;
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
    getAgenda: async (
      root,
      { topics = [] },
      { models: { Schedule }, ValidationError },
    ) => {
      try {
        const queryBuilder = Schedule.query().innerJoin(
          'papers_topics',
          'schedules.paper_id',
          'papers_topics.paper_id',
        );
        topics.forEach(topic_id => {
          queryBuilder.orWhere('topic_id', topic_id);
        });
        return queryBuilder;
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
      { models: { Schedule }, ValidationError, user, expo },
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

        // Test Expo Push notification!
        if (Expo.isExpoPushToken(user.notification_key)) {
          await handlePushNofication(expo, {
            to: user.notification_key,
            sound: 'default',
            body: 'There is a new schedule for you',
            data: { schedule: newSchedule },
          });
        }

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
      { models: { Schedule }, ValidationError, expo, user },
    ) => {
      try {
        const updateSchedule = await Schedule.query().updateAndFetchById(
          data.id,
          data,
        );

        // Test Expo Push notification!
        if (Expo.isExpoPushToken(user.notification_key)) {
          await handlePushNofication(expo, {
            to: user.notification_key,
            sound: 'default',
            body: 'Your schedule has been updated!',
            data: { schedule: updateSchedule },
          });
        }

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

        // delete schedule
        if (schedule) {
          await schedule.deletePersonalSchedule();
          await Schedule.query().deleteById(id);
          return schedule;
        }
        return {
          id: 0,
        };
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
  },
};
