import AdminMembersRepository from "domain/repository/admin_members_repository";

export default class RemoveAdminMemberFromWorkGroup {
    private adminMemberRepository: AdminMembersRepository;

    constructor(
        adminMemberRepository: AdminMembersRepository,
    ) {
        this.adminMemberRepository = adminMemberRepository;
    }

    async run(memberId: number, workgroupName: string): Promise<void> {
        await this.adminMemberRepository.leaveWorkGroup(memberId, workgroupName);
    }
}