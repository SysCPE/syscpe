import getAllAdminMembers from './get_all_admin_members';
import Router from '@koa/router';

const AdminRouter = new Router();
AdminRouter.get('/', getAllAdminMembers);

export default AdminRouter;