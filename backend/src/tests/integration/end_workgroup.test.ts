import { Server } from "http";
import request from "supertest";
import ServicesWorkGroupRepository from "services/service_work_group_repository";
import { mockWorkGroups } from "./mocks/mock_work_groups";
import useServer from "tests/hook/useServer";

describe('POST /workgroups/end-workgroup', () => {
    const serverFactory = useServer();
    const ROUTE = '/workgroups/end-workgroup';
    let server: Server;

    beforeAll(() => {
        server = serverFactory();
    });

    afterAll(() => {
        server.close();
    });

    beforeEach(async () => {
        for (const workgroup of Object.values(mockWorkGroups)) {
            await ServicesWorkGroupRepository.saveWorkGroup(
                workgroup.name,
                workgroup.description,
                workgroup.creationDate,
            );
        }
    });

    it('Should return OK on a good request', async () => {
        const response = await request(server).post(ROUTE).send({
            name: 'PSEL-2021'
        });
        expect(response.status).toBe(200);
    });
    
    it('Should return 400 on a bad request', async () => {
        const response = await request(server).post(ROUTE).send({
            name: 'Dados d20'
        });
        expect(response.status).toBe(400);
    });
});