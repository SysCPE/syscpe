import DepartmentEntity from 'domain/departments/entities/DepartmentEntity';
import departmentsService from 'services/departments_service';

const listDepartmentsUseCase = async (): Promise<DepartmentEntity[]> => {
  return departmentsService.listDepartments();
};

export default listDepartmentsUseCase;
