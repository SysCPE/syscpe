import { Server } from "http";
import request from "supertest";
import useServer from "tests/hook/useServer";
import ServicesDepartmentRepository from "services/service_department_repository";
import DepartmentEntity from "domain/entities/department_entity";
import { mockDepartments } from "./mocks/mock_departments";

describe('POST /departments', () => {
    const serverFactory = useServer();
    const ROUTE = '/departments';
    let server: Server;

    beforeAll(() => {
        server = serverFactory();
    });

    afterAll(() => {
        server.close();
    });

    it('should create all departments', async () => {
        for(const department of Object.values(mockDepartments)) {
            const name = department.name;
            const creationDate = department.creationDate;
            const response = await request(server).post(ROUTE).send({
                name, creationDate,
            });
            expect(response.status).toBe(200);
        }

        const assertDepartmentInList = (
            department: DepartmentEntity,
            departmentList: DepartmentEntity[],
        ) => {
            const found = departmentList.find((depart) => department.name === depart.name);

            expect(found).not.toBeNull();
            expect(found).toMatchObject(department);
        }

        const departments = await ServicesDepartmentRepository.getAllDepartments();
        for(const department of Object.values(mockDepartments)) {
            assertDepartmentInList(department, departments);
        }

    });

    it('Should not create existing department', async () => {
        const department = Object.values(mockDepartments)[0];
        const response1 = await request(server).post(ROUTE).send({
            name: department.name,
            creationDate: department.creationDate,
        });
        expect(response1.status).toBe(200);
        
        const response2 = await request(server).post(ROUTE).send({
            name: department.name,
            creationDate: department.creationDate,
        });
        expect(response2.status).toBe(400);
        expect(response2.text).toBe(`Department ${department.name} already exists`);
    });

});