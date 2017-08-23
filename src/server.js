import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { execute, subscribe } from 'graphql';
import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import config from './config';
import formatError from './utils/formatError';
import ValidationError from './utils/ValidationError';

Promise = require('bluebird'); // eslint-disable-line no-global-assign

const start = () => {
  const app = express();
  app.use(helmet());
  app.use(cors('*'));

  mongoose.Promise = Promise;

  const mongoUri = config.mongo.host;
  mongoose.connect(mongoUri, { useMongoClient: true });

  const PORT = config.port;
  return app.listen(PORT, () => {
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
