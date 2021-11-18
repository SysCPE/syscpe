import cors from '@koa/cors';
import Router from '@koa/router';
import initModels from 'database';
import koa from 'koa';
import Api from './api';

const bootstrap = async () => {
  initModels();

  const router = new Router();
  router.use(Api.routes()).use(Api.allowedMethods());

  const app = new koa();

  app.use(cors({ origin: '*' }));
  app.use(router.routes());

  app.on('error', (err) => {
    // TODO improve this part
    console.log(err);
  });

  return app;
};

export default bootstrap;
