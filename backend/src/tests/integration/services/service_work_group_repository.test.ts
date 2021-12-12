import ServicesWorkGroupRepository from "services/service_work_group_repository";
import { mockWorkGroups } from "../mocks/mock_work_groups";
import useDatabase from "tests/hook/useDatabase";
import { UpdateWorkGroupParams, WorkGroupAlreadyEndedError, WorkGroupNotFoundError } from "domain/repository/work_group_repository";

describe('ServicesWorkGroupRepository', () => {
    useDatabase();

    beforeEach(async () => {
        for (const workgroup of Object.values(mockWorkGroups)) {
            await ServicesWorkGroupRepository.saveWorkGroup(
                workgroup.name,
                workgroup.description,
                workgroup.creationDate,
            );
        }
    });

    it('should return all work groups', async () => {
        const result = await ServicesWorkGroupRepository.getAllWorkGroups();
        for (const workgroup of result) {
            expect(workgroup).toMatchObject({
                ...mockWorkGroups[workgroup.name],
                creationDate: new Date(workgroup.creationDate!), 
            });
        }
    });

    it('should end a work group', async () => {
        const name = 'Dados';
        const workgroupBefore = await ServicesWorkGroupRepository.getWorkGroup(name);
        expect(workgroupBefore).toBeTruthy();
        expect(workgroupBefore!.endDate).toBeFalsy();
        
        await ServicesWorkGroupRepository.endWorkGroup(name);
        const workgroupAfter = await ServicesWorkGroupRepository.getWorkGroup(name);
        expect(workgroupAfter).toBeTruthy();
        expect(workgroupAfter!.endDate).toBeTruthy();
    });

    it('should not end a work group that does not exist', async () => {
        const name = 'Dadosssss';
        await expect(ServicesWorkGroupRepository.endWorkGroup(name)).rejects.toThrow(WorkGroupNotFoundError);
    });

    it('should not end a work group that has already ended', async () => {
        const name = 'Dados';
        await ServicesWorkGroupRepository.endWorkGroup(name);
        await expect(ServicesWorkGroupRepository.endWorkGroup(name)).rejects.toThrow(WorkGroupAlreadyEndedError);
    });

    it('should edit a work group\'s description and creationDate', async () => {
        const name = 'Dados';
        const changes: UpdateWorkGroupParams = {
            description: 'Departamento responsável por jogar RPG com os alunos do cursinho',
            creationDate: new Date(2020, 1, 20),
        };
        
        const workgroupBefore = await ServicesWorkGroupRepository.getWorkGroup(name);
        expect(workgroupBefore!.description).not.toEqual(changes.description);
        expect(workgroupBefore!.creationDate).not.toEqual(changes.creationDate);

        await ServicesWorkGroupRepository.updateWorkGroup(name, changes);

        const workgroupAfter = await ServicesWorkGroupRepository.getWorkGroup(name);
        expect(workgroupAfter!.description).toEqual(changes.description);
        expect(workgroupAfter!.creationDate).toEqual(changes.creationDate);
    });

    it('should not edit an invalid work group', async () => {
        const name = 'Dados d20';
        const changes: UpdateWorkGroupParams = {
            description: 'Departamento responsável por jogar RPG com os alunos do cursinho',
            creationDate: new Date(2020, 1, 20),
        };
        
        await expect(ServicesWorkGroupRepository.updateWorkGroup(name, changes)).rejects.toThrow(WorkGroupNotFoundError);
    });
});
