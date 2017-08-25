export default {
  Query: {
    getAllUsers: async (root, data, { models: { User } }) => {
      const users = await User.query();
      console.log(users);
      return [];
    },
  },
};
