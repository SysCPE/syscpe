import Router from "@koa/router";
import bodyParser from 'koa-body';
import createWorkGroup from "./create_workgroup";
import endWorkGroup from "./end_workgroup";
import getAllWorkGroups from "./get_all_work_groups";

const WorkGroupRouter = new Router();
WorkGroupRouter.post('/', bodyParser(), createWorkGroup);
WorkGroupRouter.get('/', getAllWorkGroups);
WorkGroupRouter.post('/end-workgroup', bodyParser(), endWorkGroup);

export default WorkGroupRouter;