import axios from 'axios';
import DepartmentEntity from 'domain/departments/entities/DepartmentEntity';
import DepartmentData from './mappers/department_data';
import mapDepartmentDataToEntity from './mappers/map_department_data_to_entity';

const departmentsService = {
  listDepartments: async (): Promise<DepartmentEntity[]> => {
    const response = await axios.get('/departments');
    const departmentsData = response.data.departments as DepartmentData[];

    return departmentsData.map(mapDepartmentDataToEntity);
  },
  createDepartment: async (name: string): Promise<DepartmentEntity> => {
    await axios.post('/departments', { departmentName: name });

    return {
      id: name,
      name,
      description: '',
      director: '',
      viceDirector: '',
    };
  },
  deleteDepartment: async (department: DepartmentEntity): Promise<void> => {
    await axios.post('/departments/delete', { name: department.name });
  },
};

export default departmentsService;
