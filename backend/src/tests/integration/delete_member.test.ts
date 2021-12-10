import AdminMemberEntity from 'domain/entities/admin_member_entity';
import { Server } from 'http';
import ServicesMembersRepository from 'services/service_members_repository';
import request from 'supertest';
import useServer from 'tests/hook/useServer';
import { mockAdminMembers } from './mocks/mock_members';

describe('POST /members/admin/delete-member', () => {
  const serverFactory = useServer();
  const ROUTE = '/members/admin/delete-member';
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

  it('should return not found when member does not exist', async () => {
    const response = await request(server).post(ROUTE).send({ idCPE: -1 });

    expect(response.status).toBe(404);
    expect(response.text).toBe('member does not exist');
  });

  it('should delete member', async () => {
    const response = await request(server)
      .post(ROUTE)
      .send({ idCPE: adminMember.idCPE });

    expect(response.status).toBe(200);
    expect(response.text).toBe('member deleted');
  });
});
