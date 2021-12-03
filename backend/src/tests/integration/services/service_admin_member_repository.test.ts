import ServicesMembersRepository from "services/service_members_repository";
import { mockAdminMembers } from "../mocks/mock_members";
import useDatabase from "tests/hook/useDatabase";

describe('ServicesDepartmentRepository', () => {
    useDatabase();
  
    beforeEach(async () => {
        // TODO: create a function to initialize table data?
        await Promise.all(Object.values(mockAdminMembers).map(adminMember => {
            ServicesMembersRepository.saveAdminMember(adminMember)
        }));
    });
  
    it('should find a member', async () => {
        const result = await ServicesMembersRepository.getAdminMember(1);
        expect(result).toBeTruthy();
    });
    
    it ('should not find a member', async () => {
        const result = await ServicesMembersRepository.getAdminMember(420);
        expect(result).not.toBeTruthy();
    });
});