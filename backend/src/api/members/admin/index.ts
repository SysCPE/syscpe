import getAllAdminMembers from './get_all_admin_members';
import uploadUsers from './upload_users';
import Router from '@koa/router';
import multer from '@koa/multer';

const upload = multer();

const AdminRouter = new Router();
AdminRouter.get('/', getAllAdminMembers);
AdminRouter.post('/upload-users', upload.single('users'), uploadUsers);

export default AdminRouter;