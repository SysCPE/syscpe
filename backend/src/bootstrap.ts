import cors from '@koa/cors';
import Router from '@koa/router';
import koa from 'koa';
import Api from './api';
import initModels from './database';
import logging from './logging';

const bootstrap = async () => {
  initModels();

  const router = new Router();
  router.use(Api.routes()).use(Api.allowedMethods());

  const app = new koa();

  app.use(cors({ origin: '*', allowHeaders: '*' }));
  app.use(router.routes());

  app.on('error', (err) => logging(err));

  return app;
};

export default bootstrap;
