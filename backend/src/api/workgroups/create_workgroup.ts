import { WorkGroupAlreadyExistsError } from "domain/repository/work_group_repository";
import CreateWorkGroup from "domain/usecases/create_work_group";
import { Context } from "koa";
import ServicesWorkGroupRepository from "services/service_work_group_repository";

const createWorkGroup = async (ctx: Context) => {
    const usecase = new CreateWorkGroup(ServicesWorkGroupRepository);
    const name = ctx.request.body.name;
    const description = ctx.request.body.description;
    const creationDate = ctx.request.body.creationDate;

    try {
        await usecase.run(name, description, creationDate);
    }
    catch (error) {
        if (error instanceof WorkGroupAlreadyExistsError) {
            ctx.throw(400, error.message);
        }
        throw error;
    }
    ctx.response.body = {};
}

export default createWorkGroup;