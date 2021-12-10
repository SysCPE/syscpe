import MemberEntity from './member_entity';
export type activeEnum = 'ACTIVE' | 'INACTIVE' | 'TIMEOFF';

type AdminMemberEntity = {
  departmentName?: string;
  workgroups?: string[];
  
  pronoun?: string;
  eachCourse?: string;
  semester?: number;
  period?: number;
  isActive?: activeEnum;
} & MemberEntity;

export default AdminMemberEntity;
