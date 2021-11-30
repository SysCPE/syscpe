import Router from '@koa/router';
import koaBody from 'koa-body';
import getAllAdminMembers from './get_all_admin_members';
import uploadUsers from './upload_users';

const AdminRouter = new Router();
AdminRouter.get('/', getAllAdminMembers);
AdminRouter.post('/upload-users', koaBody({ multipart: true }), uploadUsers);

export default AdminRouter;
