import Router from "@koa/router";
import bodyParser from 'koa-body';
import createDepartment from "./create_department";

const DepartmentRouter = new Router();
DepartmentRouter.post('/', bodyParser(), createDepartment);

export default DepartmentRouter;