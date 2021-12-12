import ServicesWorkGroupRepository from "services/service_work_group_repository";
import { mockWorkGroups } from "../mocks/mock_work_groups";
import useDatabase from "tests/hook/useDatabase";
import { WorkGroupAlreadyEndedError, WorkGroupNotFoundError } from "domain/repository/work_group_repository";

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
});
