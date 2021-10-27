import { Context, Next } from 'koa';
import jwt from 'koa-jwt';
import jwksRsa from 'jwks-rsa';
import axios from 'axios';

import { AUTH0_DOMAIN, AUTH0_AUDIENCE } from '../config/auth0';

export const checkJwt = jwt({
    secret: jwksRsa.koaJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${AUTH0_DOMAIN}/.well-known/jwks.json`
    }),
    audience: AUTH0_AUDIENCE,
    issuer: `https://${AUTH0_DOMAIN}/`,
    algorithms: ['RS256']
  });

export const getUserInfo = async (ctx: Context, next: Next) => {
    const bearerToken = ctx.request.header.authorization;

    try {
      const res = await axios.get(`https://${AUTH0_DOMAIN}/userinfo`, {
        headers: { 'Authorization': bearerToken || '' }
      })
      ctx.state.user.email = res.data.email;
    }
    catch (err) {
      console.log(err);
    }

    await next();
}