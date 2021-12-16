import AdminMemberEntity from 'domain/entities/admin_member_entity';
import { Server } from 'http';
import ServicesMembersRepository from 'services/service_members_repository';
import request from 'supertest';
import useServer from 'tests/hook/useServer';
import { mockAdminMembers } from './mocks/mock_members';

describe('POST /members/admin/edit-member', () => {
  const serverFactory = useServer();
  const ROUTE = '/members/admin/edit-member';
  let server: Server;
  let adminMember: AdminMemberEntity;

  beforeAll(() => {
    server = serverFactory();
  });

  beforeEach(async () => {
    adminMember = (await ServicesMembersRepository.saveAdminMember(
      mockAdminMembers['a@gmail.com']
    ))!;
  });

  it('should return bad request when idCPE is not sent', async () => {
    const response = await request(server).post(ROUTE);

    expect(response.status).toBe(400);
    expect(response.text).toBe('idCPE cannot be empty');
  });

  it('should return bad request when data is not sent', async () => {
    const response = await request(server).post(ROUTE).send({ idCPE: 123 });

    expect(response.status).toBe(400);
    expect(response.text).toBe('data cannot be empty');
  });

  it('should return not found when member does not exist', async () => {
    const response = await request(server)
      .post(ROUTE)
      .send({ idCPE: 123, data: {} });

    expect(response.status).toBe(404);
    expect(response.text).toBe('member does not exist');
  });

  it('shoud return bad request when member email is edited', async () => {
    const response = await request(server)
      .post(ROUTE)
      .send({
        idCPE: adminMember.idCPE,
        data: {
          email: 'invalid@gmail.com',
        },
      });

    expect(response.status).toBe(400);
    expect(response.text).toBe('member cannot have email edited');
  });

  it('should edit member data', async () => {
    const response = await request(server)
      .post(ROUTE)
      .send({
        idCPE: adminMember.idCPE,
        data: {
          ...mockAdminMembers['a@gmail.com'],
          RG: '111',
          CPF: '333',
          socialName: 'Social Name',
        },
      });

    expect(response.status).toBe(200);

    const editedModel = (await ServicesMembersRepository.getAdminMember(
      adminMember.idCPE!
    ))!;
    expect(editedModel.RG).toBe('111');
    expect(editedModel.CPF).toBe('333');
    expect(editedModel.socialName).toBe('Social Name');
  });
});
