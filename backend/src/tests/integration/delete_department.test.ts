import { Server } from 'http';
import each from 'jest-each';
import ServicesDepartmentRepository from 'services/service_department_repository';
import ServicesMembersRepository from 'services/service_members_repository';
import request from 'supertest';
import useServer from 'tests/hook/useServer';
import { mockDepartments } from './mocks/mock_departments';


const initDepartments = async () => {
    for (const department of Object.values(mockDepartments)) {
      await ServicesDepartmentRepository.saveDepartment(
        department.name,
        department.creationDate
      );
    }
  }
  

describe('POST /departments/delete', () => {
  const serverFactory = useServer();
  const ROUTE = '/departments/delete';
  let server: Server;

  beforeAll(() => {
    server = serverFactory();
  });

  afterAll(() => {
    server.close();
  });

  beforeEach(async () => {
    await initDepartments();
  });
  
  it('should return 200 on a good request', async () => {
    const name = 'inovaTec';
    const response = await request(server).post(ROUTE).send({
        name: name,
    });

    expect(response.status).toBe(200);
  });

  it('should return 400 on a request with missing name', async () => {
    const response = await request(server).post(ROUTE);
    expect(response.status).toBe(400);
  });

  it('should return 400 on a request with invalid department', async () => {
    const name = 'iiii';
    const response = await request(server).post(ROUTE).send({
        name: name,
    });
    expect(response.status).toBe(400);
  });
});