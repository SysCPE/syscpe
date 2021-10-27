import { checkJwt, getUserInfo } from "./middlewares";
import Router from '@koa/router'

const router = new Router();

router.get('/private', checkJwt, getUserInfo, (ctx) => {
    ctx.response.body = `Private page: logged in as ${ctx.state.user.email}`;
});

export default router;