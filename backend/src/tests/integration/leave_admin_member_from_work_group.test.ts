import { Server } from 'http';
import each from 'jest-each';
import ServicesMembersRepository from 'services/service_members_repository';
import request from 'supertest';
import useServer from 'tests/hook/useServer';
import ServicesWorkGroupRepository from 'services/service_work_group_repository';
import { mockAdminMembers } from './mocks/mock_members';
import { mockWorkGroups } from './mocks/mock_work_groups';
import { hasUncaughtExceptionCaptureCallback } from 'process';

const initAdminMembers = async () => {
    for (const adminMember of Object.values(mockAdminMembers)) {
        await ServicesMembersRepository.saveAdminMember({
            ...adminMember,
            status: 'ACTIVE',
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

describe('POST /members/admin/leave-workgroup', () => {
    const serverFactory = useServer();
    const ROUTE = '/members/admin/leave-workgroup';
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
    ]).it('should remove the fist workgroup from the member', async (memberId: number, workgroupNames: string[]) => {

        const member = await ServicesMembersRepository.getAdminMember(memberId);
        expect(member).toBeTruthy();

        for (const workgroupName of workgroupNames) {
            const workgroup = await ServicesWorkGroupRepository.getWorkGroup(workgroupName);
            expect(workgroup?.name).toBe(workgroupName);
            const result = await ServicesMembersRepository.assignToWorkGroup(member!, workgroup!);
            expect(result.workgroups).toContain(workgroupName);
        }

        const workgroupName = workgroupNames[0];
        const response = await request(server).post(ROUTE).send({
            memberId, workgroupName,
        });

        expect(response.status).toBe(200);
        expect(member?.workgroups).not.toContain(workgroupName);

    });

    it('should not remove not existing member of workgroup', async() => {
        const workgroupName = 'Dados';
        const memberId = 999;
        const response = await request(server).post(ROUTE).send({
            memberId, workgroupName,
        });

        expect(response.status).toBe(400);
        expect(response.text).toBe(`Could not find admin member with ID ${memberId}`);
    });

    it('should not remove member of non assigned workgroup', async() => {
        const workgroupName = 'Dados';
        const memberId = 1;
        const member = await ServicesMembersRepository.getAdminMember(memberId);
        expect(member).toBeTruthy();
        expect(member?.workgroups).not.toContain(workgroupName);

        const response = await request(server).post(ROUTE).send({
            memberId, workgroupName,
        });

        expect(member?.workgroups).not.toContain(workgroupName);
        expect(response.status).toBe(200);
    });

});