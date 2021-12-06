import AdminMemberEntity from 'domain/entities/admin_member_entity';
import DepartmentEntity from 'domain/entities/department_entity';

type AdminMembersRepository = {
  getAdminMember: (memberId: number) => Promise<AdminMemberEntity | null>;
  
  getAdminMemberByEmail: (email: string) => Promise<AdminMemberEntity | null>;

  readAdminMembersFromCSVFile: (file: Buffer) => Promise<AdminMemberEntity[]>;
  
  saveAdminMember: (
    adminMember: AdminMemberEntity
  ) => Promise<AdminMemberEntity | null>;

  getAllAdminMembers: () => Promise<AdminMemberEntity[]>;

  changeAdminMemberDepartment: (member: AdminMemberEntity, department: DepartmentEntity) => Promise<AdminMemberEntity>;
};

export default AdminMembersRepository;
