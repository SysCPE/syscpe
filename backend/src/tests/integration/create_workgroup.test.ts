import { Server } from "http";
import request from "supertest";
import useServer from "tests/hook/useServer";
import ServicesWorkGroupRepository from "services/service_work_group_repository";
import WorkGroupEntity from "domain/entities/work_group_entity";
import { mockWorkGroups } from "./mocks/mock_work_groups";

describe('POST /workgroups', () => {
    const serverFactory = useServer();
    const ROUTE = '/workgroups';
    let server: Server;

    beforeAll(() => {
        server = serverFactory();
    });

    afterAll(() => {
        server.close();
    });

    it('Should create all work groups', async () => {
        for(const workgroup of Object.values(mockWorkGroups)) {
            const name = workgroup.name;
            const description = workgroup.description;
            const creationDate = workgroup.creationDate;
            const response = await request(server).post(ROUTE).send({
                name, description, creationDate,
            });

            expect(response.status).toBe(200);
        }

        const assertWorkGroupInList = (
            workgroup: WorkGroupEntity,
            workgroupList: WorkGroupEntity[],
        ) => {
            const found = workgroupList.find((workgp) => workgroup.name === workgp.name);

            expect(found).not.toBeNull();
            expect(found).toMatchObject(workgroup);
        }

        const workgroups = await ServicesWorkGroupRepository.getAllWorkGroups();
        for(const workgroup of Object.values(mockWorkGroups)) {
            assertWorkGroupInList(workgroup, workgroups);
        }
    });

    it('Should not create existing work group', async () => {
        const workgroup = Object.values(mockWorkGroups)[0];
        const response1 = await request(server).post(ROUTE).send({
            name: workgroup.name,
            description: workgroup.description,
            creationDate: workgroup.creationDate,
        });
        expect(response1.status).toBe(200);
        
        const response2 = await request(server).post(ROUTE).send({
            name: workgroup.name,
            description: workgroup.description,
            creationDate: workgroup.creationDate,
        });
        expect(response2.status).toBe(400);
        expect(response2.text).toBe(`Work group ${workgroup.name} already exists`);
    });
});



