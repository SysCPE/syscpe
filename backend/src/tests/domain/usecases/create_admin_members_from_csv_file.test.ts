import AdminMemberEntity from 'domain/entities/admin_member_entity';
import MembersRepository from 'domain/repository/members_repository';
import CreateAdminMembersFromCSVFile from 'domain/usecases/create_admin_members_from _csv_file';
import each from 'jest-each';
import { mock } from 'jest-mock-extended';

describe('CreateAdminMembersFromCSVFiles', () => {
  each([[[]], [[mock<AdminMemberEntity>(), mock<AdminMemberEntity>()]]]).it(
    'should run create admin members from csv file usecase',
    async (mockAdminMembers: AdminMemberEntity[]) => {
      const mockFile = mock<Buffer>();
      const mockMemberRepository = mock<MembersRepository>();
      const usecase = new CreateAdminMembersFromCSVFile(mockMemberRepository);

      mockMemberRepository.readAdminMembersFromCSVFile.mockReturnValue(
        Promise.resolve(mockAdminMembers)
      );

      await usecase.run(mockFile);

      expect(
        mockMemberRepository.readAdminMembersFromCSVFile
      ).toHaveBeenCalledWith(mockFile);
      expect(mockMemberRepository.saveAdminMember).toHaveBeenCalledTimes(
        mockAdminMembers.length
      );
      for (let i = 0; i < mockAdminMembers.length; ++i) {
        expect(mockMemberRepository.saveAdminMember).toHaveBeenNthCalledWith(
          i + 1,
          mockAdminMembers[i]
        );
      }
    }
  );
});
