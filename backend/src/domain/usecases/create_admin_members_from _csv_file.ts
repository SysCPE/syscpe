import AdminMemberEntity from 'domain/entities/admin_member_entity';
import AdminMembersRepository from 'domain/repository/admin_members_repository';

class CreateAdminMembersFromCSVFile {
  private membersRepository: AdminMembersRepository;

  constructor(membersRepository: AdminMembersRepository) {
    this.membersRepository = membersRepository;
  }

  async run(file: Buffer): Promise<AdminMemberEntity[]> {
    const adminMembers =
      await this.membersRepository.readAdminMembersFromCSVFile(file);

    const createdAdminMembers: AdminMemberEntity[] = [];

    for (const adminMember of adminMembers) {
      const createdAdminMember = await this.membersRepository.saveAdminMember(
        adminMember
      );

      if (createdAdminMember !== null)
        createdAdminMembers.push(createdAdminMember);
    }

    return createdAdminMembers;
  }
}

export default CreateAdminMembersFromCSVFile;
