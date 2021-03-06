import AdminMemberEntity from 'domain/entities/admin_member_entity';
import DepartmentEntity from 'domain/entities/department_entity';
import WorkGroupEntity from 'domain/entities/work_group_entity';

export class AdminMemberNotFoundError extends Error {}

type AdminMembersRepository = {
  getAdminMember: (memberId: number) => Promise<AdminMemberEntity | null>;

  getAdminMemberByEmail: (email: string) => Promise<AdminMemberEntity | null>;

  readAdminMembersFromCSVFile: (file: Buffer) => Promise<AdminMemberEntity[]>;

  saveAdminMember: (
    adminMember: AdminMemberEntity
  ) => Promise<AdminMemberEntity | null>;

  getAllAdminMembers: () => Promise<AdminMemberEntity[]>;

  changeAdminMemberDepartment: (
    member: AdminMemberEntity,
    department: DepartmentEntity
  ) => Promise<AdminMemberEntity>;

  assignToWorkGroup: (
    member: AdminMemberEntity,
    workgroup: WorkGroupEntity
  ) => Promise<AdminMemberEntity>;

  deleteMember: (idCPE: number) => Promise<void>;

  leaveWorkGroup: (idCPE: number, workgroup: string) => Promise<void>;

  editMember: (idCPE: number, adminMember: AdminMemberEntity) => Promise<void>;
};

export default AdminMembersRepository;
