import Router from '@koa/router';
import koaBody from 'koa-body';
import assignWorkGroup from './assign_work_group';
import changeDepartment from './change_department';
import deleteMember from './delete_member';
import editMember from './edit_member';
import getAllAdminMembers from './get_all_admin_members';
import uploadUsers from './upload_users';

const AdminRouter = new Router();
AdminRouter.get('/', getAllAdminMembers);
AdminRouter.post('/upload-users', koaBody({ multipart: true }), uploadUsers);
AdminRouter.post('/change-department', koaBody(), changeDepartment);
AdminRouter.post('/assign-workgroup', koaBody(), assignWorkGroup);
AdminRouter.post('/delete-member', koaBody(), deleteMember);
AdminRouter.post('/edit-member', koaBody(), editMember);

export default AdminRouter;
