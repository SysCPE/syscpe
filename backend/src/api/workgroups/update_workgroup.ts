import { UpdateWorkGroupParams, WorkGroupNotFoundError } from "domain/repository/work_group_repository";
import UpdateWorkGroup from "domain/usecases/update_work_group";
import { Context } from "koa";
import ServicesWorkGroupRepository from "services/service_work_group_repository";

type Request = {
    name: string;
    changes: UpdateWorkGroupParams
};
const updateWorkGroup = async (ctx: Context) => {
    const { name, changes } = ctx.request.body as Request;
    if (!name) ctx.throw(400, 'Work group name not provided');
    if (!changes) ctx.throw(400, 'No changes provided');

    const usecase = new UpdateWorkGroup(ServicesWorkGroupRepository);

    try {
        await usecase.run(name, changes);
    }
    catch(error) {
        if (error instanceof WorkGroupNotFoundError)
            ctx.throw(400, error.message);
        throw error;
    }

    ctx.response.body = `Successfully updated work group ${name}`;
}

export default updateWorkGroup;