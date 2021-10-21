import bootstrap from './bootstrap';
import Router from '@koa/router';
import jwt from 'koa-jwt';
import jwksRsa from 'jwks-rsa';
import bodyParser from 'koa-body';
import { Context, Next } from 'koa';

const main = async () => {
  const app = await bootstrap({ CONNECT_TO_DB: false });
  const router = new Router();
  
  const checkJwt = jwt({
    secret: jwksRsa.koaJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: 'https://dev-9z29sgnd.us.auth0.com/.well-known/jwks.json'
    }),
    audience: 'SysCPE',
    issuer: 'https://dev-9z29sgnd.us.auth0.com/',
    algorithms: ['RS256']
  });

  
  const printReq = async (ctx: Context, next: Next) => { console.log(ctx); await next(); }
  app.use(bodyParser());
  app.use(printReq);
  
  router.get('/public', (ctx) => ctx.response.body = 'Public page :D');
  router.get('/private', checkJwt, (ctx) => {
    console.log(ctx.body);
    ctx.response.body = 'Private page :O'
  });
  app.on('error',function (err,ctx) {
    console.log(err);
    // logger.error('server error',err,ctx);
  })

  app.use(router.routes()).use(router.allowedMethods());
  app.listen(4201);
  console.log('Server started at port 3000');
};

main();
