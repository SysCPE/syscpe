import ServicesWorkGroupRepository from "services/service_work_group_repository";
import { mockWorkGroups } from "../mocks/mock_work_groups";
import useDatabase from "tests/hook/useDatabase";

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
});
