import ServicesMembersRepository from "services/service_members_repository";
import { mockAdminMembers } from "../mocks/mock_members";
import { mockDepartments } from "../mocks/mock_departments";
import useDatabase from "tests/hook/useDatabase";
import ServicesDepartmentRepository from "services/service_department_repository";
import each from "jest-each";

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
});