import ServicesDepartmentRepository, { __mapDepartmentModelToEntity } from "services/service_department_repository";
import { mockDepartments } from "../mocks/mock_departments";
import useDatabase from "tests/hook/useDatabase";
import DepartmentEntity from "domain/entities/department_entity";
import { mockAdminMembers } from "../mocks/mock_members";
import ServicesMembersRepository from "services/service_members_repository";
import Department from "database/models/Department";

describe('ServicesDepartmentRepository', () => {
    const inovaTec = mockDepartments['inovaTec'];
    const gestaoDePessoas = mockDepartments['Gestão de Pessoas'];
    const USEDATABASE = useDatabase();

    const assertDepartmentExists = async (expectedDepartment: DepartmentEntity) => {
        const receivedDepartment = await ServicesDepartmentRepository.getDepartment(expectedDepartment.name);
        expect(receivedDepartment).not.toBeNull();
        expect(receivedDepartment!.name).toBe(expectedDepartment.name);
        expect(receivedDepartment!.creationDate).toStrictEqual(expectedDepartment.creationDate);
        expect(receivedDepartment!.directorId).toBe(expectedDepartment.directorId);
        expect(receivedDepartment!.viceDirectorId).toBe(expectedDepartment.viceDirectorId);
    };

  
    beforeEach(async () => {
        Object.values(mockAdminMembers).map(async mockMember => {
            await ServicesMembersRepository.saveAdminMember(mockMember)
        });
        await ServicesDepartmentRepository.saveDepartment(inovaTec.name, inovaTec.creationDate);
        await ServicesDepartmentRepository.saveDepartment(gestaoDePessoas.name, inovaTec.creationDate);
    }
    );
  
    it('should find a department', async () => {
        const result = await ServicesDepartmentRepository.getDepartment('Gestão de Pessoas');
        expect(result).toBeTruthy();
        expect(result?.name).toEqual('Gestão de Pessoas');
    });

    it ('should not find a department', async () => {
        const result = await ServicesDepartmentRepository.getDepartment('Gestão');
        expect(result).not.toBeTruthy();
    });

    it ('should update a department when directorId or viceDirectorId are present', async () => {
        const inovaTecUpdate: DepartmentEntity = { 
            name: inovaTec.name,
            creationDate: inovaTec.creationDate,
            directorId:mockAdminMembers['a@gmail.com'].idCPE,
            viceDirectorId:mockAdminMembers['b@gmail.com'].idCPE,
        };

        const result = await ServicesDepartmentRepository.updateDepartment(inovaTecUpdate);

        expect(result[0]).toBeTruthy();
        await assertDepartmentExists(inovaTecUpdate);
    });

    it('should update department given that director and vice director are NOT present', async () => {
        const gestaoDePessoasUpdate: DepartmentEntity = { 
            name: gestaoDePessoas.name,
            creationDate: gestaoDePessoas.creationDate,
        };

        const result = await ServicesDepartmentRepository.updateDepartment(gestaoDePessoasUpdate);
        expect(result[0]).toBeTruthy();
        await assertDepartmentExists(gestaoDePessoasUpdate);
    });
});