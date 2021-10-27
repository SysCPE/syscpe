import koa from 'koa';
import path from 'path';
import Umzug from 'umzug';
import bodyParser from 'koa-body';
import { Sequelize } from 'sequelize';

import Api from './api';
import Router from '@koa/router';


const bootstrap = async ({ CONNECT_TO_DB = false }) => {
  const db = CONNECT_TO_DB ? await connectDatabase() : null;  
  
  const router = new Router();
  router.use(Api.routes()).use(Api.allowedMethods());

  const app = new koa();
  app.use(bodyParser());
  app.use(router.routes());

  app.on('error', (err) => { console.log(err) });

  return app;
};

const connectDatabase = async (): Promise<Sequelize> => {
  const sequelize = new Sequelize(
    (process.env.DB_CONNECTION_STRING as string) || ''
  );

  const umzug = new Umzug({
    migrations: {
      path: path.join(__dirname, 'database/migrations'),
      params: [sequelize.getQueryInterface()],
    },
    storage: 'sequelize',
    storageOptions: {
      sequelize: sequelize,
    },
    logging: console.log,
  });

  await umzug.up();

  return sequelize;
};

export default bootstrap;
