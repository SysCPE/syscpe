import { AdminMemberNotFoundError } from 'domain/repository/admin_members_repository';
import { WorkGroupNotFoundError } from 'domain/repository/work_group_repository';
import AssignAdminMemberToWorkGroup from 'domain/usecases/assign-admin-member-to-workgroup';
import { Context } from 'koa';
import ServicesMembersRepository from 'services/service_members_repository';
import ServicesWorkGroupRepository from 'services/service_work_group_repository';


const assignWorkGroup = async (ctx: Context) => {
    const usecase = new AssignAdminMemberToWorkGroup(ServicesMembersRepository, ServicesWorkGroupRepository);
    const memberId = ctx.request.body.memberId;
    const workgroupName = ctx.request.body.workgroupName;

    try {
        await usecase.run(memberId, workgroupName);
    }
    catch (e) {
        if (e instanceof AdminMemberNotFoundError)
            ctx.throw(400, `Cannot find member with ID ${memberId}`);
        if (e instanceof WorkGroupNotFoundError)
            ctx.throw(400, `Cannot find Work Group ${workgroupName}`);
    }
    ctx.response.body = {};
}

export default assignWorkGroup;