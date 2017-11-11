export default {
  Room: {
    schedules: async ({ id }, data, { models: { Schedule } }) => {
      const schedules = await Schedule.query().where('room_id', id);
      return schedules;
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
    getRoomsByStatus: async (
      root,
      { status },
      { models: { Room }, ValidationError },
    ) => {
      try {
        const rooms = await Room.query().where('status', status);
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
    insertRoom: async (root, data, { models: { Room }, ValidationError }) => {
      try {
        const newRoom = await Room.query().insert(data);
        return newRoom;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new ValidationError(e);
      }
    },
    updateRoom: async (root, data, { models: { Room }, ValidationError }) => {
      try {
        const updateRoom = await Room.query().updateAndFetchById(data.id, data);
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
