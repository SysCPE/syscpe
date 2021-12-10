import AdminMembersRepository, { AdminMemberNotFoundError } from "domain/repository/admin_members_repository";
import DepartmentRepository, { DepartmentNotFoundError } from "domain/repository/department_repository";


export default class ChangeAdminMemberDepartment {
    private adminMemberRepository: AdminMembersRepository;
    private departmentRepository: DepartmentRepository;

    constructor(
        adminMemberRepository: AdminMembersRepository,
        departmentRepository: DepartmentRepository,
    ) {
        this.adminMemberRepository = adminMemberRepository;
        this.departmentRepository = departmentRepository;
    }
    
    async run(memberId: number, departmentName: string): Promise<void> {
        const member = await this.adminMemberRepository.getAdminMember(memberId);
        if (!member) throw new AdminMemberNotFoundError(`Cannot find member with ID ${memberId}`);

        const department = await this.departmentRepository.getDepartment(departmentName);
        if (!department) throw new DepartmentNotFoundError(`Cannot find department with name ${departmentName}`);

        await this.adminMemberRepository.changeAdminMemberDepartment(member, department);
    }
}