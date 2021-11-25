import DepartmentRepository from 'domain/repository/department_repository';
import CreateDepartment from 'domain/usecases/create_department';
import { mock } from 'jest-mock-extended';

describe('CreateDepartment', () => {
    it('Should return a Department', async () => {
        const mockDepartmentRepository = mock<DepartmentRepository>();
        const useCase = new CreateDepartment(mockDepartmentRepository);

        mockDepartmentRepository.createDepartment.mockReturnValueOnce(Promise.resolve({
            name: 'InovaTec',
            creationDate: new Date(),
        }));
        mockDepartmentRepository.saveDepartment.mockReturnValueOnce(Promise.resolve(true));

        const result = await useCase.run('InovaTec');
        expect(result?.name).toBe('InovaTec');
    });

    it('Should return undefined', async () => {
        const mockDepartmentRepository = mock<DepartmentRepository>();
        const useCase = new CreateDepartment(mockDepartmentRepository);

        mockDepartmentRepository.createDepartment.mockReturnValueOnce(Promise.resolve({
            name: 'Gestão de Pessoas',
            creationDate: new Date(),
        }));
        mockDepartmentRepository.saveDepartment.mockReturnValueOnce(Promise.resolve(false));

        const result = await useCase.run('Gestão de Pessoas');
        expect(result).toBe(undefined);
    });
})