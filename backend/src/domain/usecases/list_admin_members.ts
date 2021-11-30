import AdminMemberEntity from "domain/entities/admin_member_entity";
import MembersRepository from "domain/repository/members_repository";

export default class ListAdminMembers {
    private membersRepository: MembersRepository;

    constructor(membersRepository: MembersRepository) {
        this.membersRepository = membersRepository;
    }

    async run(): Promise<AdminMemberEntity[]> {
        return this.membersRepository.getAllAdminMembers();
    }
}