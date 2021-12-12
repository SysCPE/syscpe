import { AdminMemberNotFoundError } from 'domain/repository/admin_members_repository';
import { WorkGroupNotFoundError } from 'domain/repository/work_group_repository';
import RemoveAdminMemberFromWorkGroup from 'domain/usecases/remove_member_from_workgroup';
import { Context } from 'koa';
import ServicesMembersRepository from 'services/service_members_repository';

const leaveWorkGroup = async (ctx: Context) => {
    const usecase = new RemoveAdminMemberFromWorkGroup(ServicesMembersRepository);
    const memberId = ctx.request.body.memberId;
    const workgroupName = ctx.request.body.workgroupName;

    try {
        await usecase.run(memberId, workgroupName);
    }
    catch (error) {
        if (error instanceof AdminMemberNotFoundError)
            ctx.throw(400, error.message);
        if (error instanceof WorkGroupNotFoundError)
            ctx.throw(400, error.message);
        throw error;
    }
    
    ctx.response.body = {};
}

export default leaveWorkGroup;