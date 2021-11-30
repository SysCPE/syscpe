import DepartmentRepository from 'domain/repository/department_repository';
import CreateDepartment from 'domain/usecases/create_department';
import { mock } from 'jest-mock-extended';

describe('CreateDepartment', () => {
    it('Should return a Department', async () => {
        const mockDepartmentRepository = mock<DepartmentRepository>();
        const useCase = new CreateDepartment(mockDepartmentRepository);

        mockDepartmentRepository.saveDepartment.mockReturnValueOnce(Promise.resolve({
            name: 'InovaTec',
            creationDate: new Date(),
        }));

        const result = await useCase.run('InovaTec');
        expect(result?.name).toBe('InovaTec');
    });
})