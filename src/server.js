import express from 'express';
// import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
// import jwt from 'jsonwebtoken';
import knex from 'knex';
import { Model } from 'objection';
// import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
// import { execute, subscribe } from 'graphql';
// import { createServer } from 'http';
// import { SubscriptionServer } from 'subscriptions-transport-ws';
import config from './config';
import knexConfig from './knexfile';
// import formatError from './utils/formatError';
// import ValidationError from './utils/ValidationError';
import models from './models';

Promise = require('bluebird'); // eslint-disable-line no-global-assign

const start = () => {
  const app = express();
  app.use(helmet());
  app.use(cors('*'));

  const Knex = knex(knexConfig.development);
  Model.knex(Knex);

  const PORT = config.port;
  return app.listen(PORT, async () => {
    await models.User.query().delete();
    const result = await models.User.query().insert({
      firstname: 'Le',
      lastname: 'Dinh Nhat Khanh',
      email: 'lednhatkhanh@gmail.com',
      password: 'Abc123@@',
      version_key: '123123123123@!@!@@!@',
    });
    console.log(result.checkPassword('Abc123@@'));
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
