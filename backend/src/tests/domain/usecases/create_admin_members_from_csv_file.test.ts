import AdminMemberEntity from 'domain/entities/admin_member_entity';
import MembersRepository from 'domain/repository/members_repository';
import CreateAdminMembersFromCSVFile from 'domain/usecases/create_admin_members_from _csv_file';
import { mock } from 'jest-mock-extended';

describe('CreateAdminMembersFromCSVFiles', () => {
  it('should run create admin members from csv file usecase', async () => {
    const mockFile = mock<Blob>();
    const mockMemberRepository = mock<MembersRepository>();
    const usecase = new CreateAdminMembersFromCSVFile(mockMemberRepository);
    const mockAdminMembers = [
      mock<AdminMemberEntity>(),
      mock<AdminMemberEntity>(),
    ];

    mockMemberRepository.readAdminMembersFromCSVFile.mockReturnValue(
      Promise.resolve(mockAdminMembers)
    );

    await usecase.run(mockFile);

    expect(
      mockMemberRepository.readAdminMembersFromCSVFile
    ).toHaveBeenCalledWith(mockFile);
    expect(mockMemberRepository.saveAdminMember).toHaveBeenCalledTimes(2);
    expect(mockMemberRepository.saveAdminMember).toHaveBeenNthCalledWith(
      1,
      mockAdminMembers[0]
    );
    expect(mockMemberRepository.saveAdminMember).toHaveBeenNthCalledWith(
      2,
      mockAdminMembers[1]
    );
  });
});
