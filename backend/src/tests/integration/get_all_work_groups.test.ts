import { Server } from "http";
import request from "supertest";
import ServicesWorkGroupRepository from "services/service_work_group_repository";
import { mockWorkGroups } from "./mocks/mock_work_groups";
import WorkGroupEntity from "domain/entities/work_group_entity";
import useServer from "tests/hook/useServer";

describe('GET /workgroups', () => {
    const serverFactory = useServer();
    const ROUTE = '/workgroups';
    let server: Server;

    beforeAll(() => {
        server = serverFactory();
    });

    afterAll(() => {
        server.close();
    });

    it('Should return all work groups', async () => {
        for(const workgroup of Object.values(mockWorkGroups)) {
            await ServicesWorkGroupRepository.saveWorkGroup(
                workgroup.name,
                workgroup.description,
                workgroup.creationDate,
            );
        }

        const response = await request(server).get(ROUTE);
        expect(response.status).toBe(200);
       
        const assertWorkGroupInList = (
            workgroup: WorkGroupEntity,
            workgroupList: WorkGroupEntity[],
        ) => {
            const found = workgroupList.find((workgp) => workgroup.name === workgp.name);

            expect(found).not.toBeNull();
            expect(found).toMatchObject(workgroup);
        }

        const parsedWorkGroups: WorkGroupEntity[] = response.body.workgroups.map(
            (workgroup: WorkGroupEntity): WorkGroupEntity => ({
                name: workgroup.name,
                description: workgroup.description,
                creationDate: new Date(workgroup.creationDate!),
            })
        );

        for (const workgroup of Object.values(mockWorkGroups)) {
            assertWorkGroupInList(workgroup, parsedWorkGroups);
        }
    });
});