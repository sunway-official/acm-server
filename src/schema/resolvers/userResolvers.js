import jwt from 'jsonwebtoken';

export default {
  Query: {
    getAllUsers: async (root, data, { models: { User } }) => {
      const users = await User.query();
      return users;
    },
    me: (root, data, { ValidationError, user }) => {
      if (!user) {
        throw new ValidationError('unauthorized');
      }
      return user;
    },
  },
  Mutation: {
    register: async (
      root,
      data,
      { models: { User }, ValidationError, user },
    ) => {
      if (user) {
        throw new ValidationError('still-logging-in');
      }
      Object.assign(data, data, {
        gender: 'unknown',
      });
      try {
        const newUser = await User.query().insert(data);
        return newUser;
      } catch (e) {
        if (e.code === '23505') {
          throw new ValidationError('email-existed', 'email');
        }
        throw new ValidationError('bad-request');
      }
    },
    login: async (
      root,
      { email, password },
      { models: { User }, ValidationError, user, config },
    ) => {
      if (user) {
        throw new ValidationError('still-logging-in');
      }

      const authUser = await User.query().findOne({ email });
      if (!authUser) {
        throw new ValidationError('bad-credetials');
      }
      const isPasswordMatch = await authUser.checkPassword(password);
      if (!isPasswordMatch) {
        throw new ValidationError('bad-credetials');
      }

      const tokenPayload = {
        id: authUser.id,
        versionKey: authUser.version_key,
      };
      const token = jwt.sign(tokenPayload, config.jwtSecret, {
        expiresIn: '15m',
      });
      const refreshToken = jwt.sign(tokenPayload, config.jwtSecret, {
        expiresIn: '7d',
      });
      return {
        token,
        refreshToken,
      };
    },
  },
};
