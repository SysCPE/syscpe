import AdminMemberEntity from 'domain/entities/admin_member_entity';

type MembersRepository = {
  readAdminMembersFromCSVFile: (file: Buffer) => Promise<AdminMemberEntity[]>;
  saveAdminMember: (
    adminMember: AdminMemberEntity
  ) => Promise<AdminMemberEntity | null>;
};

export default MembersRepository;
