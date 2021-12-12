import Router from '@koa/router';
import koaBody from 'koa-body';
import getAllAdminMembers from './get_all_admin_members';
import uploadUsers from './upload_users';
import changeDepartment from './change_department';
import assignWorkGroup from './assign_work_group';
import leaveWorkGroup from './leave_work_group';

const AdminRouter = new Router();
AdminRouter.get('/', getAllAdminMembers);
AdminRouter.post('/upload-users', koaBody({ multipart: true }), uploadUsers);
AdminRouter.post('/change-department', koaBody(), changeDepartment);
AdminRouter.post('/assign-workgroup', koaBody(), assignWorkGroup);
AdminRouter.post('/leave-workgroup', koaBody(), leaveWorkGroup);

export default AdminRouter;
