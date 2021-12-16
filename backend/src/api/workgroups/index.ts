import Router from "@koa/router";
import bodyParser from 'koa-body';
import createWorkGroup from "./create_workgroup";
import endWorkGroup from "./end_workgroup";
import getAllWorkGroups from "./get_all_work_groups";
import updateWorkGroup from "./update_workgroup";

const WorkGroupRouter = new Router();
WorkGroupRouter.post('/', bodyParser(), createWorkGroup);
WorkGroupRouter.get('/', getAllWorkGroups);
WorkGroupRouter.post('/end-workgroup', bodyParser(), endWorkGroup);
WorkGroupRouter.post('/update-workgroup', bodyParser(), updateWorkGroup);

export default WorkGroupRouter;