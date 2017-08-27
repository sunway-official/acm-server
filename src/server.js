import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import jwt from 'jsonwebtoken';
import knex from 'knex';
import { Model } from 'objection';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { execute, subscribe } from 'graphql';
import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import schema from './schema';
import config from './config';
import knexConfig from './knexfile';
import formatError from './utils/formatError';
import ValidationError from './utils/ValidationError';
import models from './models';

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const { id, versionKey } = await jwt.verify(token, config.jwtSecret);
    const user = await models.User.query().findById(id);
    const isKeyMatch = user.version_key === versionKey;
    req.user = user && isKeyMatch ? user : null;
    return next();
  } catch (tokenError) {
    if (tokenError.name === 'TokenExpiredError') {
      try {
        const refreshToken = req.headers.refreshtoken;
        const { id, versionKey } = await jwt.verify(
          refreshToken,
          config.jwtRefreshSecret,
        );
        const user = await models.User.query().findById(id);
        const isKeyMatch = user.version_key === versionKey;
        if (isKeyMatch) {
          const tokenPayload = {
            id: user.id,
            versionKey: user.version_key,
          };
          const newToken = jwt.sign(tokenPayload, config.jwtSecret, {
            expiresIn: '15m',
          });
          const newRefreshToken = jwt.sign(
            tokenPayload,
            config.jwtRefreshSecret,
            {
              expiresIn: '7d',
            },
          );
          req.user = user;
          res.set('Access-Control-Expose-Headers', 'X-Token, X-Refresh-Token');
          res.set('X-Token', newToken);
          res.set('X-Refresh-Token', newRefreshToken);
          return next();
        }
        return next();
      } catch (refreshTokenError) {
        return next();
      }
    }
    return next();
  }
};

const start = () => {
  const app = express();
  app.use(helmet());
  app.use(cors('*'));

  const Knex =
    process.env.node_env === 'production'
      ? knex(knexConfig.production)
      : knex(knexConfig.development);
  Model.knex(Knex);

  app.use(authenticate);

  app.use(
    '/graphql',
    bodyParser.json(),
    graphqlExpress(req => ({
      context: {
        ValidationError,
        config,
        models,
        user: req.user,
      },
      formatError,
      schema,
    })),
  );

  const PORT = config.port;
  app.use(
    '/graphiql',
    graphiqlExpress({
      endpointURL: '/graphql',
      subscriptionsEndpoint: `ws://localhost:${PORT}/subscriptions`,
    }),
  );

  const server = createServer(app);
  return server.listen(PORT, async () => {
    SubscriptionServer.create(
      {
        execute,
        subscribe,
        schema,
        onConnect: async () => ({
          models,
        }),
      },
      { server, path: '/subscriptions' },
    );
    // eslint-disable-next-line no-console
    console.log(`App is listening on port ${PORT}`);
  });
};

const stop = app => {
  app.close();
};

export default {
  start,
  stop,
};
