export default {
  Room: {
    schedules: async ({ id }, data, { models: { Schedule } }) => {
      const schedules = await Schedule.query().where('room_id', id);
      return schedules;
    },
    conference: async ({ conference_id }, data, { models: { Conference } }) => {
      const conference = await Conference.query().findById(conference_id);
      return conference;
    },
  },
  Query: {
    getAllRooms: async (root, data, { models: { Room }, ValidationError }) => {
      try {
        const rooms = await Room.query();
        return rooms;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
    getRoomsByStatusInConference: async (
      root,
      { status },
      { models: { Room }, ValidationError, user },
    ) => {
      try {
        if (!user) {
          throw new ValidationError('unauthorized');
        }
        // eslint-disable-next-line
        const conference_id = user.current_conference_id;
        // eslint-disable-next-line
        const rooms = await Room.query().where(builder => {
          builder.where('conference_id', conference_id).where('status', status);
        });
        return rooms;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
    getRoomsByConferenceID: async (
      root,
      data,
      { models: { Room }, ValidationError, user },
    ) => {
      try {
        if (!user) {
          throw new ValidationError('unauthorized');
        }
        // eslint-disable-next-line
        const conference_id = user.current_conference_id;
        // eslint-disable-next-line
        const rooms = await Room.query().where('conference_id', conference_id);
        return rooms;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
    getRoomByID: async (
      root,
      { id },
      { models: { Room }, ValidationError },
    ) => {
      try {
        const room = await Room.query().findById(id);
        if (!room) {
          throw new ValidationError('Room-not-found');
        }
        return room;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
  },
  Mutation: {
    insertRoomInConference: async (
      root,
      data,
      { models: { Room }, ValidationError, user },
    ) => {
      try {
        if (!user) {
          throw new ValidationError('unauthorized');
        }
        // eslint-disable-next-line
        const conference_id = user.current_conference_id;
        // eslint-disable-next-line
        data.conference_id = conference_id;
        if (data.name) {
          const room = await Room.query().where(builder => {
            builder
              .where('name', data.name)
              .where('conference_id', conference_id);
          });
          if (room.length > 0)
            throw new ValidationError("Room's name is exists !");
        }
        const newRoom = await Room.query().insert(data);
        return newRoom;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
    updateRoomInConference: async (
      root,
      { id, name, seats, status },
      { models: { Room, Schedule }, ValidationError, user },
    ) => {
      try {
        if (!user) {
          throw new ValidationError('unauthorized');
        }
        // eslint-disable-next-line
        const conference_id = user.current_conference_id;
        // check room's name exists
        if (name) {
          const room = await Room.query().where(builder => {
            builder
              .where('name', name)
              .where('conference_id', conference_id)
              .whereNot('id', id);
          });
          if (room.length > 0)
            throw new ValidationError("Room's name is exists !");
        }
        // check room is chosen
        if (status && status === 'off') {
          const schedules = await Schedule.query().where('room_id', id);
          if (schedules.length > 0) {
            throw new ValidationError('This room is chosen !');
          }
        }
        const updateRoom = await Room.query()
          .updateAndFetchById(id, { name, seats, status })
          .where(builder => {
            builder.where('conference_id', conference_id);
          });
        if (!updateRoom) {
          throw new ValidationError("Room's not found in conference");
        }

        return updateRoom;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
    deleteRoom: async (root, { id }, { models: { Room }, ValidationError }) => {
      try {
        const room = await Room.query().findById(id);

        // delete Schedule By RoomID
        await room.deleteSchedule();

        // delete room
        if (room) {
          await Room.query().deleteById(id);
        }
        return room;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
  },
};
