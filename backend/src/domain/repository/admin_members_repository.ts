import AdminMemberEntity from 'domain/entities/admin_member_entity';

type AdminMembersRepository = {
  readAdminMembersFromCSVFile: (file: Buffer) => Promise<AdminMemberEntity[]>;
  saveAdminMember: (
    adminMember: AdminMemberEntity
  ) => Promise<AdminMemberEntity | null>;
  getAllAdminMembers: () => Promise<AdminMemberEntity[]>;
};

export default AdminMembersRepository;
