import Router from "@koa/router";
import bodyParser from 'koa-body';
import createDepartment from "./create_department";
import getAllDepartments from "./get_all_departments";
import updateDepartment from "./updateDepartment";

const DepartmentRouter = new Router();
DepartmentRouter.post('/', bodyParser(), createDepartment);
DepartmentRouter.get('/', getAllDepartments);
DepartmentRouter.post('/update-department', updateDepartment);

export default DepartmentRouter;