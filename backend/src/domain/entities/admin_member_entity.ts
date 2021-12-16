import MemberEntity from './member_entity';
export type activeEnum = 'ACTIVE' | 'INACTIVE' | 'TIMEOFF';

type AdminMemberEntity = {
  departmentName?: string;
  workgroups?: string[];
  
  pronoun?: string;
  course?: string;
  semester?: number;
  period?: number;
  status?: activeEnum;
} & MemberEntity;

export default AdminMemberEntity;
