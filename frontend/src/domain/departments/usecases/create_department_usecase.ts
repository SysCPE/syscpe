import DepartmentEntity from 'domain/departments/entities/DepartmentEntity';
import departmentsService from 'services/departments_service';

const createDepartmentUseCase = async (
  name: string
): Promise<DepartmentEntity> => {
  return await departmentsService.createDepartment(name);
};

export default createDepartmentUseCase;
