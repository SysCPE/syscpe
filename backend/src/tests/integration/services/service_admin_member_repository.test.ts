import ServicesMembersRepository from "services/service_members_repository";
import { mockAdminMembers } from "../mocks/mock_members";
import useDatabase from "tests/hook/useDatabase";

const initAdminMembers = async () => {
    for (const adminMember of Object.values(mockAdminMembers)) {
        await ServicesMembersRepository.saveAdminMember({
            ...adminMember,
            isActive: true,
        })
    }
}

describe('ServicesDepartmentRepository', () => {
    useDatabase();
  
    beforeEach(async () => {
        await initAdminMembers();
    });
  
    it('should find a member by ID', async () => {
        const result = await ServicesMembersRepository.getAdminMember(1);
        expect(result).toBeTruthy();
    });
    
    it('should not find a member by ID', async () => {
        const result = await ServicesMembersRepository.getAdminMember(420);
        expect(result).not.toBeTruthy();
    });

    it('should find a member by email', async () => {
        const result = await ServicesMembersRepository.getAdminMemberByEmail('a@gmail.com');
        expect(result).toBeTruthy();
    });
    
    it('should not find a member by email', async () => {
        const result = await ServicesMembersRepository.getAdminMemberByEmail('zzzzz@gmail.com');
        expect(result).not.toBeTruthy();
    });
});