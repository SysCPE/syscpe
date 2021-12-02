import Router from "@koa/router";
import bodyParser from 'koa-body';
import createDepartment from "./create_department";
import getAllDepartments from "./get_all_departments";

const DepartmentRouter = new Router();
DepartmentRouter.post('/', bodyParser(), createDepartment);
DepartmentRouter.get('/', getAllDepartments);

export default DepartmentRouter;