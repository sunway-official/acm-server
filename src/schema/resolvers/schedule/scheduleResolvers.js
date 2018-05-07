import Expo from 'expo-server-sdk';
import { raw } from 'objection';
import handlePushNotification from '../../../services/handlePushNotification';

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
      if (user.current_conference_id === 0) {
        throw new ValidationError('no-current-conference');
      }
      try {
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
      { models: { Schedule }, ValidationError, user },
    ) => {
      if (!user) {
        throw new ValidationError('unauthorized');
      }
      if (user.current_conference_id === 0) {
        throw new ValidationError('no-current-conference');
      }
      try {
        const queryBuilder = Schedule.query()
          .where('conference_id', user.current_conference_id)
          .orderBy('start', 'desc')
          .innerJoin(
            'papers_topics',
            'schedules.paper_id',
            'papers_topics.paper_id',
          );
        // if topics is valid
        if (topics.length > 0) {
          queryBuilder.andWhere(
            raw(
              `${topics
                .reduce((query, id) => `${query} topic_id = ${id} or`, '(')
                .slice(0, -2)})`,
            ),
            // Example output of this where condition: "(topic_id = 1, topic_id = 2)"
          );
        }
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
      { models: { Schedule, User }, ValidationError, user, expo },
    ) => {
      try {
        if (!user) {
          throw new ValidationError('unauthorized');
        }

        if (!user.current_conference_id) {
          throw new ValidationError('no-current-conference');
        }

        // eslint-disable-next-line
        const conference_id = user.current_conference_id;
        // eslint-disable-next-line
        data.conference_id = conference_id;
        const newSchedule = await Schedule.query().insert(data);

        // Test Expo Push notification!
        const promises = [];
        const users = await User.query()
          .select('email')
          .innerJoin(
            'schedules',
            'users.current_conference_id',
            'schedules.conference_id',
          )
          .where('schedules.conference_id', user.current_conference_id)
          .groupBy('users.email');
        users.forEach(u => {
          if (u.notification_key && Expo.isExpoPushToken(u.notification_key)) {
            promises.push(
              handlePushNotification(expo, {
                to: u.notification_key,
                sound: 'default',
                body: `Activity ${newSchedule.activity_title} will start at ${
                  newSchedule.start
                } at room ${newSchedule.room_name}`,
                data: { schedule: newSchedule },
              }),
            );
          }
        });

        await Promise.all(promises);

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
      { models: { Schedule, User }, ValidationError, expo, user },
    ) => {
      try {
        const updateSchedule = await Schedule.query().updateAndFetchById(
          data.id,
          data,
        );

        // Test Expo Push notification!
        const promises = [];
        const users = await User.query()
          .select('email')
          .innerJoin(
            'schedules',
            'users.current_conference_id',
            'schedules.conference_id',
          )
          .where('schedules.conference_id', user.current_conference_id)
          .groupBy('users.email');
        users.forEach(u => {
          if (u.notification_key && Expo.isExpoPushToken(u.notification_key)) {
            promises.push(
              handlePushNotification(expo, {
                to: u.notification_key,
                sound: 'default',
                body: `Activity ${
                  updateSchedule.activity_title
                } will start at ${updateSchedule.start} at room ${
                  updateSchedule.room_name
                }`,
                data: { schedule: updateSchedule },
              }),
            );
          }
        });

        await Promise.all(promises);

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
