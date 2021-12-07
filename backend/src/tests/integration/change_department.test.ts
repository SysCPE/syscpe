import { Server } from 'http';
import each from 'jest-each';
import ServicesMembersRepository from 'services/service_members_repository';
import request from 'supertest';
import useServer from 'tests/hook/useServer';
import { mockAdminMembers } from './mocks/mock_members';
import { mockDepartments } from './mocks/mock_departments';
import ServicesDepartmentRepository from 'services/service_department_repository';
import AdminMember from 'database/models/AdminMember';


const initAdminMembers = async () => {
  for (const adminMember of Object.values(mockAdminMembers)) {
    await ServicesMembersRepository.saveAdminMember({
      ...adminMember,
      isActive: 'ACTIVE',
    })
  }
}

const initDepartments = async () => {
  for (const department of Object.values(mockDepartments)) {
    await ServicesDepartmentRepository.saveDepartment(
      department.name,
      department.creationDate
    );
  }
}

const memberDepartment = async (memberId: number) => {
  const member = await AdminMember.findByPk(memberId, {
    include: { association: AdminMember.associations.department },
  });
  return member!.department?.name;
}

describe('POST /members/admin/change-department', () => {
  const serverFactory = useServer();
  const ROUTE = '/members/admin/change-department';
  let server: Server;

  beforeAll(() => {
    server = serverFactory();
  });

  afterAll(() => {
    server.close();
  });

  beforeEach(async () => {
    await initAdminMembers();
    await initDepartments();
  });

  
  each([
    [1, 'Gestão de Pessoas'],
    [3, 'Gestão de Pessoas'],
    [1, 'inovaTec'],
  ]).it('should change member\'s department', async (memberId: number, departmentName: string) => {
    const response = await request(server).post(ROUTE).send({
      memberId, departmentName,
    });
    expect(response.status).toBe(200);

    const memberDept = await memberDepartment(memberId);
    expect(memberDept).toBe(departmentName);
  });

  it('should not find member', async () => {
    const memberId = 420;
    const departmentName = 'inovaTec';

    const response = await request(server).post(ROUTE).send({
      memberId, departmentName,
    });

    expect(response.status).toBe(400);
    expect(response.text).toBe(`Cannot find member with ID ${memberId}`);
  });

  it('should not find department', async () => {
    const memberId = 1;
    const departmentName = 'automated testing department';

    const previousDept = await memberDepartment(memberId);

    const response = await request(server).post(ROUTE).send({
      memberId, departmentName,
    });
    
    expect(response.status).toBe(400);
    expect(response.text).toBe(`Cannot find Department ${departmentName}`);

    const currentDept = await memberDepartment(memberId);
    expect(currentDept).toBe(previousDept);
  });
});