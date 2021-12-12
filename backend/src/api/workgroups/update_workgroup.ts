import { UpdateWorkGroupParams } from "domain/repository/work_group_repository";
import UpdateWorkGroup from "domain/usecases/update_work_group";
import { Context } from "koa";
import ServicesWorkGroupRepository from "services/service_work_group_repository";

type Request = {
    workgroupName: string;
    changes: UpdateWorkGroupParams
};
const updateWorkGroup = async (ctx: Context) => {
    const { workgroupName, changes } = ctx.request.body as Request;
    if (!workgroupName) ctx.throw(400, 'Work group name not provided');

    const usecase = new UpdateWorkGroup(ServicesWorkGroupRepository);
    usecase.run(workgroupName, changes);

    ctx.response.body = `Successfully updated work group ${workgroupName}`;
}

export default updateWorkGroup;