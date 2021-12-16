import { Server } from "http";
import request from "supertest";
import ServicesWorkGroupRepository from "services/service_work_group_repository";
import { mockWorkGroups } from "./mocks/mock_work_groups";
import useServer from "tests/hook/useServer";

describe('POST /workgroups/update-workgroup', () => {
    const serverFactory = useServer();
    const ROUTE = '/workgroups/update-workgroup';
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
            name: 'PSEL-2021',
            changes: {
                description: 'GT dedicado ao PSEL 2021',
                creationDate: new Date(1, 1, 1990),
            }
        });
        expect(response.status).toBe(200);
    });
    
    it('Should return 400 on a bad workgroup name', async () => {
        const response = await request(server).post(ROUTE).send({
            name: 'PSEL-20221121',
            changes: {
                description: 'Psel que alguem errou o nome'
            }
        });
        expect(response.status).toBe(400);
    });

    it('Should return 400 on no changes', async () => {
        const response = await request(server).post(ROUTE).send({
            name: 'PSEL-2021',
        });
        expect(response.status).toBe(400);
    });
});