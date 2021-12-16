import DepartmentEntity from 'domain/departments/entities/DepartmentEntity';
import departmentsService from 'services/departments_service';

const createDepartmentUseCase = async (
  name: string,
  creationDate?: Date
): Promise<DepartmentEntity> => {
  return await departmentsService.createDepartment(name, creationDate);
};

export default createDepartmentUseCase;
