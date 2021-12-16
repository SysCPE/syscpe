import Router from '@koa/router';
import AdminRouter from './admin';

const MembersRouter = new Router();
MembersRouter.use('/admin', AdminRouter.routes());

export default MembersRouter;