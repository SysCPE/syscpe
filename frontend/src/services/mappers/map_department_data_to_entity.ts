import DepartmentEntity from 'domain/departments/entities/DepartmentEntity';
import DepartmentData from './department_data';

const mapDepartmentDataToEntity = (
  department: DepartmentData
): DepartmentEntity => {
  return {
    id: department.name,
    name: department.name,
    description: '',
    director: '',
    viceDirector: '',
    creationDate: new Date(department.creationDate),
  };
};

export default mapDepartmentDataToEntity;
