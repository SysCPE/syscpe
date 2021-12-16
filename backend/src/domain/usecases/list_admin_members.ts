import AdminMemberEntity from "domain/entities/admin_member_entity";
import AdminMembersRepository from "domain/repository/admin_members_repository";

export default class ListAdminMembers {
    private membersRepository: AdminMembersRepository;

    constructor(membersRepository: AdminMembersRepository) {
        this.membersRepository = membersRepository;
    }

    async run(): Promise<AdminMemberEntity[]> {
        return this.membersRepository.getAllAdminMembers();
    }
}