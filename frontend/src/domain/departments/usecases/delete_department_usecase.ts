import DepartmentEntity from 'domain/departments/entities/DepartmentEntity';
import departmentsService from 'services/departments_service';

const deleteDepartmentUseCase = async (department: DepartmentEntity) => {
  await departmentsService.deleteDepartment(department);
};

export default deleteDepartmentUseCase;
