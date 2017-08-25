import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
// import jwt from 'jsonwebtoken';
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

const start = () => {
  const app = express();
  app.use(helmet());
  app.use(cors('*'));

  const Knex = knex(knexConfig.development);
  Model.knex(Knex);

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
    }),
  );
  return app.listen(PORT, async () => {
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
