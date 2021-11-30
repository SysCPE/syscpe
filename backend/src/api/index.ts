import Router from '@koa/router';
import DepartmentsRouter from './departments';
import MembersRouter from './members';
import { checkJwt, getUserInfo } from './middlewares';

const router = new Router();

router.get('/private', checkJwt, getUserInfo, (ctx) => {
  ctx.response.body = `Private page: logged in as ${ctx.state.user.email}`;
});

router.use('/members', MembersRouter.routes());
router.use('/departments', DepartmentsRouter.routes());

export default router;
