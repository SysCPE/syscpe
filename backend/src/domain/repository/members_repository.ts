import AdminMemberEntity from 'domain/entities/admin_member_entity';

type MembersRepository = {
  readAdminMembersFromCSVFile: (file: Blob) => Promise<AdminMemberEntity[]>;
  saveAdminMember: (
    adminMember: AdminMemberEntity
  ) => Promise<AdminMemberEntity>;
};

export default MembersRepository;
