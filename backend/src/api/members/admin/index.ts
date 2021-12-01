import getAllAdminMembers from './get_all_admin_members';
import uploadUsers from './upload_users';
import Router from '@koa/router';
import koaBody from 'koa-body';

const AdminRouter = new Router();
AdminRouter.get('/', getAllAdminMembers);
AdminRouter.post('/upload-users', koaBody({ multipart: true }), uploadUsers);

export default AdminRouter;