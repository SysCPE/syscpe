import ServicesDepartmentRepository from 'services/service_department_repository';
import ServicesMembersRepository from 'services/service_members_repository';
import { __mapDepartmentModelToEntity }  from 'services/service_department_repository';
import DepartmentEntity from 'domain/entities/department_entity';
import { mockDepartments } from './mocks/mock_departments';
import {  mockAdminMembers } from './mocks/mock_members';
import Department from 'database/models/Department';
import useServer from 'tests/hook/useServer';
import  request  from 'supertest';
import { Server } from 'http';

describe('Update Department route: /departments/update-departments', () => {
    const serverFactory = useServer();
    const ROUTE = '/departments/update-departments';
    const inovaTec = mockDepartments['inovaTec'];
    const gestaoDePessoas = mockDepartments['Gestão de Pessoas'];
    let server: Server;

    beforeAll(() => {
        server = serverFactory();
        
        Object.values(mockAdminMembers).map( mockMember => {
            ServicesMembersRepository.saveAdminMember(mockMember)
        });
        ServicesDepartmentRepository.saveDepartment(inovaTec.name, inovaTec.creationDate);
        ServicesDepartmentRepository.saveDepartment(gestaoDePessoas.name, inovaTec.creationDate);
    });

    afterAll(() => {
        server.close();
    });

    const assertDepartmentExists = async (expectedDepartment: DepartmentEntity) => {
        const acquiredDepartmentModel = (await Department.findOne({
            where: {
                name:expectedDepartment.name,
            },
        }))!;   //This is ugly

        const acquiredDepartment = __mapDepartmentModelToEntity(acquiredDepartmentModel);
        expect(expectedDepartment).not.toBeNull();
        expect(acquiredDepartment.name).toBe(expectedDepartment.name);
        expect(acquiredDepartment.creationDate).toBe(expectedDepartment.creationDate);
        expect(acquiredDepartment.directorId).toBe(expectedDepartment.directorId);
        expect(acquiredDepartment.viceDirectorId).toBe(expectedDepartment.viceDirectorId);
    };

    it('should return bad request when body is empty', async () => {
        const response = await request(server).post(ROUTE);
        
        expect(response.status).toBe(400);
        expect(response.text).toBe("Empty body");
    });

    it('should return bad request when department entity does not exist', async () => {
        const department: DepartmentEntity = { name: 'ivoa tnecs', creationDate: new Date()}
        const response =  await request(server).post(ROUTE).send(department);
        
        expect(response.status).toBe(400);
        expect(response.text).toBe("Department does not exist");
    });

    it('should return bad request when director admim member entity does not exist', async () => {
        const department: DepartmentEntity = { 
            name: inovaTec.name, 
            creationDate: inovaTec.creationDate, 
            directorId: (new Date()).getTime(),
        }
        const response =  await request(server).post(ROUTE).send(department);
        
        expect(response.status).toBe(400);
        expect(response.text).toBe("There is no record of that director in the database");
    });

    it('should return bad request when vice director admim member entity does not exist', async () => {
        const department: DepartmentEntity = { 
            name: inovaTec.name, 
            creationDate: inovaTec.creationDate, 
            viceDirectorId: 6969696969,
        }
        const response =  await request(server).post(ROUTE).send(department);
        
        expect(response.status).toBe(400);
        expect(response.text).toBe("There is no record of that vice director in the database");
    });

    it('should update department given that director and vice director are not present', async () => {
        const gestaoDePessoasUpdate: DepartmentEntity = { 
            name: inovaTec.name,
            creationDate: inovaTec.creationDate,
        };
        const response = await request(server).post(ROUTE).send(gestaoDePessoasUpdate);


        expect(response.statusCode).toBe(200);
        await assertDepartmentExists(gestaoDePessoasUpdate);
    });

    it('should update department given that director and vice director are present', async () => {
        const inovaTecUpdate: DepartmentEntity = { 
            name: inovaTec.name,
            creationDate: inovaTec.creationDate,
            directorId:mockAdminMembers['a@gmail.com'].idCPE,
            viceDirectorId:mockAdminMembers['b@gmail.com'].idCPE,
        };
        const response = await request(server).post(ROUTE).send(inovaTecUpdate);


        expect(response.statusCode).toBe(200);
        await assertDepartmentExists(inovaTecUpdate);
    });
})