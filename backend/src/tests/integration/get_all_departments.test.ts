import bootstrap from "bootstrap";
import { Server } from "http";
import request from "supertest";
import ServicesDepartmentRepository from "services/service_department_repository";
import { mockDepartments } from "./mocks/mock_departments";
import DepartmentEntity from "domain/entities/department_entity";
import useServer from "tests/hook/useServer";

describe('GET /departments', () => {
    const serverFactory = useServer();
    const ROUTE = '/departments';
    let server: Server;
  
    beforeAll(() => {
      server = serverFactory();
    });
  
    afterAll(() => {
      server.close();
    });

    const assertDepartmentInList = (
        department: DepartmentEntity,
        departmentList: DepartmentEntity[],
    ) => {
        const found = departmentList.find((dept) => department.name === dept.name);

        expect(found).not.toBeNull();
        expect(found).toMatchObject(department);
    }

    it('should return all departments', async () => {
        for (const department of Object.values(mockDepartments)) {
            await ServicesDepartmentRepository.saveDepartment(
                department.name,
                department.creationDate,
            );
        }

        const response = await request(server).get(ROUTE);
        expect(response.status).toBe(200);

        const parsedDepartments: DepartmentEntity[] = response.body.departments.map(
            (department: DepartmentEntity): DepartmentEntity => ({
                name: department.name,
                creationDate: new Date(department.creationDate),
            })
        );

        for (const department of Object.values(mockDepartments)) {
            assertDepartmentInList(department, parsedDepartments);
        }
    });
});