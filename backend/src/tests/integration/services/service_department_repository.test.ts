import ServicesDepartmentRepository from "services/service_department_repository";
import { mockDepartments } from "../mocks/mock_departments";
import useDatabase from "tests/hook/useDatabase";

describe('ServicesDepartmentRepository', () => {
    useDatabase();
  
    beforeEach(async () => {
        // TODO: create a function to initialize table data?
        await Promise.all(Object.values(mockDepartments).map(department => {
            ServicesDepartmentRepository.saveDepartment(
                department.name,
                department.creationDate,
            )
        }));
    });
  
    it('should find a department', async () => {
        const result = await ServicesDepartmentRepository.getDepartment('Gestão de Pessoas');
        expect(result).toBeTruthy();
        expect(result?.name).toEqual('Gestão de Pessoas');
    });

    it ('should not find a department', async () => {
        const result = await ServicesDepartmentRepository.getDepartment('Gestão');
        expect(result).not.toBeTruthy();
    });
});