import AdminMembersRepository, { AdminMemberNotFoundError } from "domain/repository/admin_members_repository";
import WorkGroupRepository, { WorkGroupNotFoundError } from "domain/repository/work_group_repository";

export default class LeaveAdminMemberFromWorkGroup {
    private adminMemberRepository: AdminMembersRepository;
    private workgroupRepository: WorkGroupRepository;

    constructor(
        adminMemberRepository: AdminMembersRepository,
        workgroupRepository: WorkGroupRepository,
    ) {
        this.adminMemberRepository = adminMemberRepository;
        this.workgroupRepository = workgroupRepository;
    }

    async run(memberId: number, workgroupName: string): Promise<void> {
        const member = await this.adminMemberRepository.getAdminMember(memberId);
        if (!member) throw new AdminMemberNotFoundError(`Cannot find member with ID ${memberId}`);

        const workgroup = await this.workgroupRepository.getWorkGroup(workgroupName);
        if (!workgroup) throw new WorkGroupNotFoundError(`Cannot find workgroup ${workgroupName}`);
    
        await this.adminMemberRepository.leaveWorkGroup(member, workgroup);
    }

}