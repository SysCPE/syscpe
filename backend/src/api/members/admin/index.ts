import multer from '@koa/multer';
import Router from '@koa/router';
import getAllAdminMembers from './get_all_admin_members';
import uploadUsers from './upload_users';

const upload = multer();

const AdminRouter = new Router();
AdminRouter.get('/', getAllAdminMembers);
AdminRouter.post('/upload-users', upload.single('users'), uploadUsers);

export default AdminRouter;
