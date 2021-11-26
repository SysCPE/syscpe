import bootstrap from 'bootstrap';
import AdminMember from 'database/models/AdminMember';
import Member from 'database/models/Member';
import fs from 'fs';
import { Server } from 'http';
import path from 'path';
import request from 'supertest';
import { mockAdminMembers, mockMembers } from './mocks/mock_members';

describe('/upload-users', () => {
  let server: Server;
  const ROUTE = '/upload-users';

  beforeAll(async () => {
    const app = await bootstrap();
    server = app.listen(4000);
  });

  afterAll(() => {
    server.close();
  });

  const assertMemberExists = async (email: string) => {
    const memberModel = (await Member.findOne({
      where: {
        email,
      },
    }))!;
    const expectedMember = mockMembers[email];

    expect(memberModel).not.toBeNull();
    expect(memberModel.email).toBe(expectedMember.email);
    expect(memberModel.name).toBe(expectedMember.name);
    expect(memberModel.socialName).toBe(expectedMember.socialName);
    expect(memberModel.RG).toBe(expectedMember.RG);
    expect(memberModel.CPF).toBe(expectedMember.CPF);
    expect(memberModel.gender).toBe(expectedMember.gender);
    expect(memberModel.phone).toBe(expectedMember.phone);
    expect(memberModel.birthday?.getTime()).toBe(
      expectedMember.birthday?.getTime()
    );

    const adminMember = (await AdminMember.findOne({
      where: { memberId: memberModel.id },
    }))!;
    const expectedAdminMember = mockAdminMembers[email];

    expect(adminMember).not.toBeNull();
    expect(adminMember.pronoum).toBe(expectedAdminMember.pronoum);
    expect(adminMember.eachCourse).toBe(expectedAdminMember.eachCourse);
    expect(adminMember.semester).toBe(expectedAdminMember.semester);
    expect(adminMember.period).toBe(expectedAdminMember.period);
  };

  it('should return bad request if file is empty', async () => {
    const response = await request(server).post(ROUTE);

    expect(response.status).toBe(400);
    expect(response.text).toBe('empty file');
  });

  it('should create users in database', async () => {
    const mockMembersCSV = fs.readFileSync(
      path.join(__dirname, 'mocks/mock_members.csv')
    );
    const response = await request(server)
      .post(ROUTE)
      .attach('users', mockMembersCSV, 'mock_members.csv');

    expect(response.status).toBe(200);
    assertMemberExists('a@gmail.com');
    assertMemberExists('b@gmail.com');
  });
});
