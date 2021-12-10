import ServicesDepartmentRepository from 'services/service_department_repository';
import ServicesMembersRepository from 'services/service_members_repository';
import { __mapDepartmentModelToEntity }  from 'services/service_department_repository';
import DepartmentEntity from 'domain/entities/department_entity';
import { mockDepartments } from './mocks/mock_departments';
import {  mockAdminMembers } from './mocks/mock_members';
import useServer from 'tests/hook/useServer';
import  request  from 'supertest';
import { Server } from 'http';

describe('Update Department route: /departments/update-department', () => {
    const serverFactory = useServer();
    const ROUTE = '/departments/update-department';
    const inovaTec = mockDepartments['inovaTec'];
    const gestaoDePessoas = mockDepartments['Gestão de Pessoas'];
    let server: Server;

    const populateDB = async () => {
        Object.values(mockAdminMembers).map(async mockMember => {
            await ServicesMembersRepository.saveAdminMember(mockMember)
        });
        await ServicesDepartmentRepository.saveDepartment(inovaTec.name, inovaTec.creationDate);
        await ServicesDepartmentRepository.saveDepartment(gestaoDePessoas.name, inovaTec.creationDate);
    }

    beforeAll(() => {
        server = serverFactory();
    });

    afterAll(() => {
        server.close();
    });

    beforeEach(async () => {
        await populateDB(); 
    });

    it('should return 200 on a good request', async () => {
        const department: DepartmentEntity = {
            name: 'inovaTec',
            creationDate: new Date(12, 10, 2021),
        };
        const response = await request(server).post(ROUTE).send(department);
        expect(response.status).toBe(200);
    })

    it('should return bad request when body is empty', async () => {
        const response = await request(server).post(ROUTE);
        
        expect(response.status).toBe(400);
        expect(response.text).toBe("Empty body");
    });

    it('should return bad request when department entity does not exist', async () => {
        const department: DepartmentEntity = { name: 'ivoa tnecs', creationDate: new Date() }
        const response = await request(server).post(ROUTE).send(department);
        
        expect(response.status).toBe(400);
        expect(response.text).toBe("NO DEPT");
    });

    it('should return bad request when director admim member entity does not exist', async () => {
        const department: DepartmentEntity = { 
            name: inovaTec.name, 
            creationDate: inovaTec.creationDate, 
            directorId: -1,
        }
        const response =  await request(server).post(ROUTE).send(department);
        
        expect(response.status).toBe(400);
        expect(response.text).toBe("NO ADMIN MEMBER FOUND WITH ID " + department.directorId);
    });

    it('should return bad request when vice director admim member entity does not exist', async () => {
        const department: DepartmentEntity = { 
            name: inovaTec.name, 
            creationDate: inovaTec.creationDate, 
            viceDirectorId: -1,
        }
        const response =  await request(server).post(ROUTE).send(department);
        
        expect(response.status).toBe(400);
        expect(response.text).toBe("NO ADMIN MEMBER FOUND WITH ID " + department.viceDirectorId);
    });

})