import CreateWorkGroup from "domain/usecases/create_work_group";
import { Context } from "koa";
import ServicesWorkGroupRepository from "services/service_work_group_repository";

const createWorkGroup = async (ctx: Context) => {
    const usecase = new CreateWorkGroup(ServicesWorkGroupRepository);
    const name = ctx.request.body.name;
    const description = ctx.request.body.description;
    const creationDate = ctx.request.body.creationDate;
    await usecase.run(name, description, creationDate);
    ctx.response.body = {};
}

export default createWorkGroup;