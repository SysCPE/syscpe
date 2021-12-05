import MemberEntity from './member_entity';

type AdminMemberEntity = {
  departmentName?: string;  // Should this be a DepartmentEntity?
  
  pronoun?: string;
  eachCourse?: string;
  semester?: number;
  period?: number;
} & MemberEntity;

export default AdminMemberEntity;
