import DepartmentEntity from 'domain/departments/entities/DepartmentEntity';
import departmentsService from 'services/departments_service';

const editDepartmentUseCase = async (department: DepartmentEntity) => {
  await departmentsService.editDepartment(department);
};

export default editDepartmentUseCase;
