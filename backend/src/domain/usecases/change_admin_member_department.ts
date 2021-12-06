import AdminMembersRepository from "domain/repository/admin_members_repository";
import DepartmentRepository from "domain/repository/department_repository";

export class MemberNotFoundError extends Error { }
export class DepartmentNotFoundError extends Error { }

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
        if (!member) throw new MemberNotFoundError(`Cannot find member with ID ${memberId}`);

        const department = await this.departmentRepository.getDepartment(departmentName);
        if (!department) throw new DepartmentNotFoundError(`Cannot find department with name ${departmentName}`);

        await this.adminMemberRepository.changeAdminMemberDepartment(member, department);
    }
}