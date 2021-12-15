import ServicesDepartmentRepository from "services/service_department_repository";
import { mockDepartments } from "../mocks/mock_departments";
import useDatabase from "tests/hook/useDatabase";
import { mockAdminMembers } from "../mocks/mock_members";
import ServicesMembersRepository from "services/service_members_repository";
import { DepartmentNotFoundError, UpdateDepartmentParams } from "domain/repository/department_repository";
import { AdminMemberNotFoundError } from "domain/repository/admin_members_repository";

const initAdminMembers = async () => {
    for (const adminMember of Object.values(mockAdminMembers)) {
        await ServicesMembersRepository.saveAdminMember({
            ...adminMember,
            status: 'ACTIVE',
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
        await initDepartments();
    });
  
    it('should find a department', async () => {
        const result = await ServicesDepartmentRepository.getDepartment('Gestão de Pessoas');
        expect(result).toBeTruthy();
        expect(result?.name).toBe('Gestão de Pessoas');
    });

    it('should not find a department', async () => {
        const result = await ServicesDepartmentRepository.getDepartment('Gestão');
        expect(result).not.toBeTruthy();
    });

    it('should update department\'s creation date', async () => {
        const name = 'Gestão de Pessoas';
        const changes: UpdateDepartmentParams = { 
            creationDate: new Date(2021, 12, 10),
        };

        const department = await ServicesDepartmentRepository.getDepartment(name);
        expect(department).toBeTruthy();
        expect(department!.creationDate).not.toBe(changes.creationDate);

        await ServicesDepartmentRepository.updateDepartment(name, changes);

        const verification = await ServicesDepartmentRepository.getDepartment(name);
        expect(verification).toBeTruthy();
        expect(verification!.creationDate).toEqual(changes.creationDate);
    });

    it('should update department\'s director', async () => {
        const name = 'inovaTec';
        const changes: UpdateDepartmentParams = { 
            directorId: 1,
        };

        const department = await ServicesDepartmentRepository.getDepartment(name);
        expect(department).toBeTruthy();
        expect(department!.directorId).not.toBe(changes.directorId);

        await ServicesDepartmentRepository.updateDepartment(name, changes);

        const verification = await ServicesDepartmentRepository.getDepartment(name);
        expect(verification).toBeTruthy();
        expect(verification!.directorId).toBe(changes.directorId);
    });

    it('should not update when no update parameters are sent', async () => {
        const name = 'inovaTec';
        const changes: UpdateDepartmentParams = { };

        const department = await ServicesDepartmentRepository.getDepartment(name);
        expect(department).toBeTruthy();

        await ServicesDepartmentRepository.updateDepartment(name, changes);

        const verification = await ServicesDepartmentRepository.getDepartment(name);
        expect(verification).toBeTruthy();
        expect(verification).toEqual(department);
    });

    it('should update all department fields', async () => {
        const name = 'inovaTec';
        const changes: UpdateDepartmentParams = { 
            creationDate: new Date(12, 10, 2021),
            directorId: 3,
            viceDirectorId: 1,
        };

        const department = await ServicesDepartmentRepository.getDepartment(name);
        expect(department).toBeTruthy();
        expect(department!.creationDate).not.toBe(changes.creationDate);
        expect(department!.directorId).not.toBe(changes.directorId);
        expect(department!.viceDirectorId).not.toBe(changes.viceDirectorId);

        await ServicesDepartmentRepository.updateDepartment(name, changes);

        const verification = await ServicesDepartmentRepository.getDepartment(name);
        expect(verification).toBeTruthy();
        expect(verification!.creationDate).toEqual(changes.creationDate);
        expect(verification!.directorId).toBe(changes.directorId);
        expect(verification!.viceDirectorId).toBe(changes.viceDirectorId);
    });

    it('should not update invalid department', async () => {
        const name = 'inovaTeccccc';
        const changes: UpdateDepartmentParams = { 
            creationDate: new Date(12, 10, 2021),
            directorId: 3,
            viceDirectorId: 1,
        };

        await expect(ServicesDepartmentRepository.updateDepartment(name, changes)).rejects.toThrow(DepartmentNotFoundError);
    });

    it('should not update invalid director', async () => {
        const name = 'inovaTec';
        const changes: UpdateDepartmentParams = { 
            directorId: -3,
        };

        await expect(ServicesDepartmentRepository.updateDepartment(name, changes)).rejects.toThrow(AdminMemberNotFoundError);
    });

    it('should not update invalid vice-director', async () => {
        const name = 'inovaTec';
        const changes: UpdateDepartmentParams = { 
            viceDirectorId: -1,
        };

        await expect(ServicesDepartmentRepository.updateDepartment(name, changes)).rejects.toThrow(AdminMemberNotFoundError);
    });

    it('should delete a department', async () => {
        const name = 'inovaTec';
        const departmetnBefore = await ServicesDepartmentRepository.getDepartment(name);
        expect(departmetnBefore).toBeTruthy();

        await ServicesDepartmentRepository.deleteDepartment(name);
        
        const verification = await ServicesDepartmentRepository.getDepartment(name);
        expect(verification).toBeFalsy();
    });

    it('should not delete department that doesn\'t exist', async () => {
        const name = 'iinovaTec';
        await expect(ServicesDepartmentRepository.deleteDepartment(name)).rejects.toThrow(DepartmentNotFoundError);
    });

    it('should set department member\'s to null', async () => {
        const departmentName = 'inovaTec';
        const memberEmail = 'a@gmail.com';

        const department = await ServicesDepartmentRepository.getDepartment(departmentName);
        const member = await ServicesMembersRepository.getAdminMemberByEmail(memberEmail);
        await ServicesMembersRepository.changeAdminMemberDepartment(member!, department!);

        const memberBefore = await ServicesMembersRepository.getAdminMemberByEmail(memberEmail);
        expect(memberBefore!.departmentName).toBe(departmentName);
        
        await ServicesDepartmentRepository.deleteDepartment(departmentName);
        
        const memberAfter = await ServicesMembersRepository.getAdminMemberByEmail(memberEmail);
        expect(memberAfter!.departmentName).toBeFalsy();
    });
});