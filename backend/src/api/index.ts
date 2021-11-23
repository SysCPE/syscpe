import Router from '@koa/router';
import MembersRouter from './members';
import { checkJwt, getUserInfo } from './middlewares';

const router = new Router();

router.get('/private', checkJwt, getUserInfo, (ctx) => {
  ctx.response.body = `Private page: logged in as ${ctx.state.user.email}`;
});

router.use('/members', MembersRouter.routes());

export default router;
