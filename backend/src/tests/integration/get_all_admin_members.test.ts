import bootstrap from 'bootstrap';
import AdminMemberEntity from 'domain/entities/admin_member_entity';
import { Server } from 'http';
import each from 'jest-each';
import ServicesMembersRepository from 'services/service_members_repository';
import request from 'supertest';
import { mockAdminMembers } from './mocks/mock_members';

describe('/members/admin', () => {
  let server: Server;
  const ROUTE = '/members/admin';

  beforeAll(async () => {
    const app = await bootstrap();
    server = app.listen(4000);
  });

  afterAll(() => {
    server.close();
  });

  const assertAdminMemberInList = (
    email: string,
    members: AdminMemberEntity[]
  ) => {
    const adminMember = members.find((member) => member.email === email);

    expect(adminMember).not.toBeNull();
    expect(adminMember).toMatchObject(mockAdminMembers[email]);
  };

  each([
    [['a@gmail.com']],
    [['a@gmail.com', 'b@gmail.com']],
    [[]],
    [['a@gmail.com', 'b@gmail.com', 'c@gmail.com']],
  ]).it('should list active members', async (disabledUsers: string[]) => {
    const allUsers = ['a@gmail.com', 'b@gmail.com', 'c@gmail.com'];
    const activeUsers = allUsers.filter(
      (email) => !disabledUsers.includes(email)
    );

    for (const userEmail of allUsers)
      await ServicesMembersRepository.saveAdminMember({
        ...mockAdminMembers[userEmail],
        isActive: activeUsers.includes(userEmail),
      });

    const response = await request(server).get(ROUTE);
    const parsedUsers: AdminMemberEntity[] = response.body.users.map(
      (user: AdminMemberEntity) => ({
        ...user,
        birthday: user.birthday ? new Date(user.birthday) : '',
      })
    );

    expect(response.status).toBe(200);
    for (const userEmail of activeUsers)
      assertAdminMemberInList(userEmail, parsedUsers);
  });
});
