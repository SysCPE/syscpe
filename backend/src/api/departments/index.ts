import Router from "@koa/router";
import bodyParser from 'koa-body';
import createDepartment from "./create_department";
import deleteDepartment from "./delete_department";
import getAllDepartments from "./get_all_departments";
import updateDepartment from "./update_department";

const DepartmentRouter = new Router();
DepartmentRouter.post('/', bodyParser(), createDepartment);
DepartmentRouter.get('/', getAllDepartments);
DepartmentRouter.post('/update-department', bodyParser(), updateDepartment);
DepartmentRouter.post('/delete', bodyParser(), deleteDepartment);

export default DepartmentRouter;