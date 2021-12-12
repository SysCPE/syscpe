import AdminMember from 'database/models/AdminMember';
import Member from 'database/models/Member';
import fs from 'fs';
import { Server } from 'http';
import path from 'path';
import ServicesMembersRepository from 'services/service_members_repository';
import request from 'supertest';
import useServer from 'tests/hook/useServer';
import { mockAdminMembers, mockMembers } from './mocks/mock_members';

describe('/members/admin/upload-users', () => {
  const serverFactory = useServer();
  const ROUTE = '/members/admin/upload-users';
  let server: Server;
  let mockMembersCSV: Buffer;

  beforeAll(() => {
    server = serverFactory();

    mockMembersCSV = fs.readFileSync(
      path.join(__dirname, 'mocks/mock_members.csv')
    );
  });

  afterAll(() => {
    server.close();
  });

  const assertAdminMembersEmpty = async () => {
    expect(await AdminMember.count()).toBe(0);
  };

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

    const adminMemberModel = (await AdminMember.findOne({
      where: { memberId: memberModel.idCPE },
    }))!;
    const expectedAdminMember = mockAdminMembers[email];

    expect(adminMemberModel).not.toBeNull();
    expect(adminMemberModel.pronoun).toBe(expectedAdminMember.pronoun);
    expect(adminMemberModel.eachCourse).toBe(expectedAdminMember.eachCourse);
    expect(adminMemberModel.semester || undefined).toBe(
      expectedAdminMember.semester
    );
    expect(adminMemberModel.period || undefined).toBe(
      expectedAdminMember.period
    );
  };

  it('should return bad request when file is empty', async () => {
    const response = await request(server).post(ROUTE);

    expect(response.status).toBe(400);
    expect(response.text).toBe('Empty file');
    await assertAdminMembersEmpty();
  });

  it('should return bad request when multiple files are sent', async () => {
    const response = await request(server)
      .post(ROUTE)
      .attach('users', mockMembersCSV, 'mock_members.csv')
      .attach('invalid_field', mockMembersCSV, 'invalid_field.csv');

    expect(response.status).toBe(400);
    expect(response.text).toBe('Only one file is allowed');
    await assertAdminMembersEmpty();
  });

  it('should create users in database', async () => {
    const response = await request(server)
      .post(ROUTE)
      .attach('users', mockMembersCSV, 'mock_members.csv');

    expect(response.status).toBe(200);

    for (const createdUserEmail of [
      'a@gmail.com',
      'b@gmail.com',
      'c@gmail.com',
    ]) {
      const createdUser = response.body.created_users.find(
        (user: any) => user.email === createdUserEmail
      );
      expect({
        ...createdUser,
        birthday: new Date(createdUser.birthday),
      }).toMatchObject(mockAdminMembers[createdUserEmail]);
      assertMemberExists(createdUserEmail);
    }
  });

  it('should not create users with repeated emails', async () => {
    await ServicesMembersRepository.saveAdminMember(mockMembers['a@gmail.com']);

    const response = await request(server)
      .post(ROUTE)
      .attach('users', mockMembersCSV, 'mock_members.csv');

    expect(response.status).toBe(200);

    for (const createdUserEmail of ['b@gmail.com', 'c@gmail.com']) {
      const createdUser = response.body.created_users.find(
        (user: any) => user.email === createdUserEmail
      );
      expect({
        ...createdUser,
        birthday: new Date(createdUser.birthday),
      }).toMatchObject(mockAdminMembers[createdUserEmail]);
      assertMemberExists(createdUserEmail);
    }
  });
});
