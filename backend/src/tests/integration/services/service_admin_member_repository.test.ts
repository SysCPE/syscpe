import ServicesMembersRepository from "services/service_members_repository";
import { mockAdminMembers } from "../mocks/mock_members";
import { mockDepartments } from "../mocks/mock_departments";
import useDatabase from "tests/hook/useDatabase";
import ServicesDepartmentRepository from "services/service_department_repository";
import each from "jest-each";
import { mockWorkGroups } from "../mocks/mock_work_groups";
import ServicesWorkGroupRepository from "services/service_work_group_repository";

const initAdminMembers = async () => {
    for (const adminMember of Object.values(mockAdminMembers)) {
        await ServicesMembersRepository.saveAdminMember({
            ...adminMember,
            isActive: 'ACTIVE',
        })
    }
}

const initDepartments = async () => {
    for (const department of Object.values(mockDepartments)) {
        await ServicesDepartmentRepository.saveDepartment(
            department.name,
            department.creationDate
        );
    }
}

const initWorkGroups = async () => {
    for (const workgroup of Object.values(mockWorkGroups)) {
        await ServicesWorkGroupRepository.saveWorkGroup(
            workgroup.name,
            workgroup.description,
            workgroup.creationDate,
        );
    }
}


describe('ServicesDepartmentRepository', () => {
    useDatabase();
  
    beforeEach(async () => {
        await initAdminMembers();
    });
  
    it('should find a member by ID', async () => {
        const result = await ServicesMembersRepository.getAdminMember(1);
        expect(result).toBeTruthy();
    });
    
    it('should not find a member by ID', async () => {
        const result = await ServicesMembersRepository.getAdminMember(420);
        expect(result).not.toBeTruthy();
    });

    it('should find a member by email', async () => {
        const result = await ServicesMembersRepository.getAdminMemberByEmail('a@gmail.com');
        expect(result).toBeTruthy();
    });
    
    it('should not find a member by email', async () => {
        const result = await ServicesMembersRepository.getAdminMemberByEmail('zzzzz@gmail.com');
        expect(result).not.toBeTruthy();
    });

    each([
        ['a@gmail.com', 'Gestão de Pessoas'],
        ['b@gmail.com', 'Gestão de Pessoas'],
        ['c@gmail.com', 'inovaTec'],
    ]).it('should change a member\'s department', async (email: string, departmentName: string) => {
        await initDepartments();
        const member = await ServicesMembersRepository.getAdminMemberByEmail(email);
        const department = await ServicesDepartmentRepository.getDepartment(departmentName);

        expect(member!.departmentName).toBeFalsy();
        const result = await ServicesMembersRepository.changeAdminMemberDepartment(member!, department!);
        expect(result!.idCPE).toBe(member!.idCPE);
        expect(result!.departmentName).toBe(departmentName);
    
        // Ensure that it persisted the changes in the database
        const verification = await ServicesMembersRepository.getAdminMemberByEmail(email);
        expect(verification!.departmentName).toBe(departmentName);
    });

    each([
        ['a@gmail.com', 'Dados'],
        ['a@gmail.com', 'Apostilas'],
        ['b@gmail.com', 'Dados'],
        ['c@gmail.com', 'Dados'],
    ]).it('should assign a member to a work group', async (email: string, workgroupName: string) => {
        await initWorkGroups();

        const member = await ServicesMembersRepository.getAdminMemberByEmail(email);
        const workgroup = await ServicesWorkGroupRepository.getWorkGroup(workgroupName);
        
        expect(member).toBeTruthy();
        expect(workgroup).toBeTruthy();

        expect(member!.workgroups).not.toContain(workgroupName);
        const result = await ServicesMembersRepository.assignToWorkGroup(member!, workgroup!);
        expect(result.workgroups).toContain(workgroupName);

        // Ensure that it persisted the changes in the database
        const verification = await ServicesMembersRepository.getAdminMemberByEmail(email);
        expect(verification!.workgroups).toContain(workgroupName);
    });
});