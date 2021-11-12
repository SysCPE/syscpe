import AdminMemberEntity from 'domain/entities/admin_member_entity';
import MembersRepository from 'domain/repository/members_repository';

class CreateAdminMembersFromCSVFile {
  private membersRepository: MembersRepository;

  constructor(membersRepository: MembersRepository) {
    this.membersRepository = membersRepository;
  }

  async run(file: Blob): Promise<AdminMemberEntity[]> {
    const adminMembers =
      await this.membersRepository.readAdminMembersFromCSVFile(file);

    return await Promise.all(
      adminMembers.map((adminMember) =>
        this.membersRepository.saveAdminMember(adminMember)
      )
    );
  }
}

export default CreateAdminMembersFromCSVFile;
