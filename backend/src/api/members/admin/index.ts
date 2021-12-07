import Router from '@koa/router';
import koaBody from 'koa-body';
import getAllAdminMembers from './get_all_admin_members';
import uploadUsers from './upload_users';
import changeDepartment from './change_department';

const AdminRouter = new Router();
AdminRouter.get('/', getAllAdminMembers);
AdminRouter.post('/upload-users', koaBody({ multipart: true }), uploadUsers);
AdminRouter.post('/change-department', koaBody(), changeDepartment);

export default AdminRouter;
