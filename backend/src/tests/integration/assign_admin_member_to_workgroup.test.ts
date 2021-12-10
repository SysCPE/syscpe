import { Server } from 'http';
import each from 'jest-each';
import ServicesMembersRepository from 'services/service_members_repository';
import request from 'supertest';
import useServer from 'tests/hook/useServer';
import { mockAdminMembers } from './mocks/mock_members';
import AdminMember from 'database/models/AdminMember';
import ServicesWorkGroupRepository from 'services/service_work_group_repository';
import { mockWorkGroups } from './mocks/mock_work_groups';


const initAdminMembers = async () => {
  for (const adminMember of Object.values(mockAdminMembers)) {
    await ServicesMembersRepository.saveAdminMember({
      ...adminMember,
      isActive: 'ACTIVE',
    });
  }
}

const initWorkGroups = async () => {
  for (const workgroup of Object.values(mockWorkGroups)) {
    await ServicesWorkGroupRepository.saveWorkGroup(
        workgroup.name,
        workgroup.description,
        workgroup.creationDate,
    );
  }
}

const memberDepartment = async (memberId: number) => {
  const member = await AdminMember.findByPk(memberId, {
    include: { association: AdminMember.associations.department },
  });
  return member!.department?.name;
}

describe('POST /members/admin/assign-workgroup', () => {
  const serverFactory = useServer();
  const ROUTE = '/members/admin/assign-workgroup';
  let server: Server;

  beforeAll(() => {
    server = serverFactory();
  });

  afterAll(() => {
    server.close();
  });

  beforeEach(async () => {
    await initAdminMembers();
    await initWorkGroups();
  });

  
  each([
    [1, ['Dados', 'Apostilas', 'PSEL-2021']],
    [3, ['Apostilas']],
  ]).it('should assign the member to the work groups', async (memberId: number, workgroupNames: string[]) => {
    
    for (const workgroupName of workgroupNames) {
      const response = await request(server).post(ROUTE).send({
        memberId, workgroupName,
      });
      expect(response.status).toBe(200);
    }

    const member = await ServicesMembersRepository.getAdminMember(memberId);
    expect(member!.workgroups!.length).toBe(workgroupNames.length);

    for (const workgroupName of workgroupNames) {
      expect(member!.workgroups).toContain(workgroupName);
    }
  });

  each([
    [42, 'Dados'],
  ]).it('should not find the member', async (memberId: number, workgroupName: string) => {
    const response = await request(server).post(ROUTE).send({
      memberId, workgroupName,
    });
    expect(response.status).toBe(400);
    expect(response.text).toBe(`Cannot find member with ID ${memberId}`);
  });

  each([
    [1, 'RPG'],
  ]).it('should not find the work group', async (memberId: number, workgroupName: string) => {
    const response = await request(server).post(ROUTE).send({
      memberId, workgroupName,
    });
    expect(response.status).toBe(400);
    expect(response.text).toBe(`Cannot find Work Group ${workgroupName}`);
  });
});