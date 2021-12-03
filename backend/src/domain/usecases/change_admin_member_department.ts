import AdminMembersRepository from "domain/repository/admin_members_repository";


export default class ChangeAdminMemberDepartment {
    private adminMemberRepository: AdminMembersRepository;

    constructor(adminMemberRepository: AdminMembersRepository) {
        this.adminMemberRepository = adminMemberRepository;
    }
    
    async run(memberId: number, departmentName: string): Promise<boolean> {
        return false;
    }
}