import axios from 'axios';
import DepartmentEntity from 'domain/departments/entities/DepartmentEntity';
import MemberEntity from 'domain/members/entities/MemberEntity';
import DepartmentData from './mappers/department_data';
import mapDepartmentDataToEntity from './mappers/map_department_data_to_entity';

const departmentsService = {
  listDepartments: async (): Promise<DepartmentEntity[]> => {
    const response = await axios.get('/departments');
    const departmentsData = response.data.departments as DepartmentData[];

    return departmentsData.map(mapDepartmentDataToEntity);
  },
  createDepartment: async (
    name: string,
    creationDate?: Date
  ): Promise<DepartmentEntity> => {
    await axios.post('/departments', { name, creationDate });

    return {
      id: name,
      name,
      description: '',
      director: '',
      viceDirector: '',
      // TODO: make backend return creationDate in case it is null
      creationDate: creationDate || new Date(),
    };
  },
  deleteDepartment: async (department: DepartmentEntity): Promise<void> => {
    await axios.post('/departments/delete', { name: department.name });
  },
  associateMember: async (
    member: MemberEntity,
    department: DepartmentEntity
  ) => {
    // TODO: Add proper error handling
    await axios.post('/members/admin/change-department', {
      memberId: member.idCPE,
      departmentName: department.name,
    });
  },
  editDepartment: async (department: DepartmentEntity) => {
    await axios.post('/departments/update-department', {
      name: department.name,
    });
  },
};

export default departmentsService;
