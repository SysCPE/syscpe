import ListWorkGroups from "domain/usecases/list_work_groups";
import ServicesWorkGroupRepository from "services/service_work_group_repository";
import { Context } from "koa";

const getAllWorkGroups = async (ctx: Context) => {
    const usecase = new ListWorkGroups(ServicesWorkGroupRepository);
    const workgroups = await usecase.run();
    
    ctx.response.body = { workgroups: workgroups };
}

export default getAllWorkGroups;