import { WorkGroupAlreadyEndedError, WorkGroupNotFoundError } from "domain/repository/work_group_repository";
import EndWorkGroup from "domain/usecases/end_work_group";
import { Context } from "koa";
import ServicesWorkGroupRepository from "services/service_work_group_repository";

const endWorkGroup = async (ctx: Context) => {
    const usecase = new EndWorkGroup(ServicesWorkGroupRepository);
    const name = ctx.request.body.name;

    if (!name)
        ctx.throw(400, `Request body must include a name parameter`);

    try {
        await usecase.run(name);
    }
    catch(error) {
        if (error instanceof WorkGroupNotFoundError || error instanceof WorkGroupAlreadyEndedError)
            ctx.throw(400, error.message);
        throw error;
    }

    ctx.response.body = {};
}

export default endWorkGroup;