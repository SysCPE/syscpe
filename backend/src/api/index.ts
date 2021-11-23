import multer from '@koa/multer';
import Router from '@koa/router';
import { checkJwt, getUserInfo } from './middlewares';
import uploadUsers from './upload_users';

const upload = multer();
const router = new Router();

router.get('/private', checkJwt, getUserInfo, (ctx) => {
  ctx.response.body = `Private page: logged in as ${ctx.state.user.email}`;
});

router.post('/upload-users', upload.single('users'), uploadUsers);

export default router;
